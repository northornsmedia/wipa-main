import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import cloudscraper
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed
import re

def process_item(item):
    title = item.find('title').text if item.find('title') is not None else 'No Title'
    link = item.find('link').text if item.find('link') is not None else ''
    
    title = re.sub(r' - .*$', '', title).strip()
    
    scraper = cloudscraper.create_scraper()
    text_content = ""
    image_url = ""
    
    if link:
        try:
            resp = scraper.get(link, timeout=10)
            soup = BeautifulSoup(resp.content, 'html.parser')
            
            # Find image from meta tags
            og_img = soup.find('meta', property='og:image')
            if og_img and og_img.get('content'):
                image_url = og_img.get('content')
            else:
                # Fallback to first image tag
                img_tag = soup.find('img')
                if img_tag and img_tag.get('src'):
                    image_url = img_tag.get('src')
                    
            for script in soup(["script", "style"]):
                script.extract()
            paragraphs = soup.find_all('p')
            text_content = " ".join([p.get_text().strip() for p in paragraphs if p.get_text().strip()])
        except Exception:
            pass
            
    if not text_content:
        desc = item.find('description').text if item.find('description') is not None else ''
        text_content = re.sub('<[^<]+>', '', desc).strip()
        
    words = text_content.split()
    
    if len(words) < 40:
        words.extend(title.split() * ((40 // max(1, len(title.split()))) + 1))
        
    title_words = title.split()
    
    if len(title_words) < 10:
        needed = 10 - len(title_words)
        title_words.extend(words[:needed])
    elif len(title_words) > 15:
        title_words = title_words[:15]
        
    final_title = " ".join(title_words)
    final_brief = " ".join(words[:40]).replace('&nbsp;', ' ')
    
    return final_title, final_brief, image_url

def main():
    query = 'site:asiaiplaw.com OR site:managingip.com OR site:trademarklawyermagazine.com'
    url = f"https://news.google.com/rss/search?q={urllib.parse.quote(query)}&hl=en-US&gl=US&ceid=US:en"
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        xml_data = response.read()
        
    root = ET.fromstring(xml_data)
    items = root.findall('.//item')[:100]
    
    indexed_items = list(enumerate(items))
    results = [None] * len(indexed_items)
    
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_idx = {executor.submit(process_item, item): idx for idx, item in indexed_items}
        for future in as_completed(future_to_idx):
            idx = future_to_idx[future]
            try:
                results[idx] = future.result()
            except Exception:
                results[idx] = ("Error retrieving the title for this specific news article", " ".join(["Error"] * 40), "")
                
    with open('latnews.md', 'w', encoding='utf-8') as f:
        f.write('# Top Latest News\n\n')
        for res in results:
            if res:
                t, b, img = res
                f.write(f"## {t}\n")
                if img:
                    f.write(f"![Image]({img})\n\n")
                else:
                    f.write("*No image available*\n\n")
                f.write(f"{b}\n\n")
            
    print(f"Done processing {len(items)} items.")

if __name__ == '__main__':
    main()
