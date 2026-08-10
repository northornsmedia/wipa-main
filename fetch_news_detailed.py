import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed
import re

def process_item(item):
    title = item.find('title').text if item.find('title') is not None else 'No Title'
    link = item.find('link').text if item.find('link') is not None else ''
    
    title = re.sub(r' - .*$', '', title).strip()
    
    text_content = ""
    if link:
        try:
            resp = requests.get(link, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}, timeout=10)
            soup = BeautifulSoup(resp.content, 'html.parser')
            paragraphs = soup.find_all('p')
            text_content = " ".join([p.get_text().strip() for p in paragraphs if p.get_text().strip()])
        except Exception:
            pass
            
    if not text_content:
        desc = item.find('description').text if item.find('description') is not None else ''
        text_content = re.sub('<[^<]+>', '', desc).strip()
        
    words = text_content.split()
    title_words = title.split()
    
    if len(title_words) < 10:
        needed = 10 - len(title_words)
        title_words.extend(words[:needed])
        words = words[needed:]
    elif len(title_words) > 15:
        title_words = title_words[:15]
        
    final_title = " ".join(title_words)
    final_brief = " ".join(words[:40])
    
    # If final_brief is still empty, add some placeholder or use title
    if not final_brief:
        final_brief = "News description is not available for this article at the moment."
        
    return final_title, final_brief

def main():
    query = 'site:asiaiplaw.com OR site:managingip.com OR site:trademarklawyermagazine.com'
    url = f"https://news.google.com/rss/search?q={urllib.parse.quote(query)}&hl=en-US&gl=US&ceid=US:en"
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        xml_data = response.read()
        
    root = ET.fromstring(xml_data)
    items = root.findall('.//item')[:100]
    
    # Keep original order by indexing
    indexed_items = list(enumerate(items))
    results = [None] * len(indexed_items)
    
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_idx = {executor.submit(process_item, item): idx for idx, item in indexed_items}
        for future in as_completed(future_to_idx):
            idx = future_to_idx[future]
            try:
                results[idx] = future.result()
            except Exception as e:
                results[idx] = ("Error retrieving title", "Error retrieving description")
                
    with open('latnews.md', 'w', encoding='utf-8') as f:
        f.write('# Top Latest News\n\n')
        for res in results:
            if res:
                t, b = res
                f.write(f"## {t}\n{b}\n\n")
            
    print(f"Done processing {len(items)} items.")

if __name__ == '__main__':
    main()
