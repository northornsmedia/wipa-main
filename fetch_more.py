import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import cloudscraper
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed
import re
import os

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
            
            og_img = soup.find('meta', property='og:image')
            if og_img and og_img.get('content'):
                image_url = og_img.get('content')
            else:
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
    
    return title, final_title, final_brief, image_url

def main():
    queries = ['site:asiaiplaw.com', 'site:managingip.com', 'site:trademarklawyermagazine.com']
    items = []
    
    for query in queries:
        url = f"https://news.google.com/rss/search?q={urllib.parse.quote(query)}&hl=en-US&gl=US&ceid=US:en"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                xml_data = response.read()
            root = ET.fromstring(xml_data)
            items.extend(root.findall('.//item')[:100])
        except Exception as e:
            print(f"Error fetching query {query}: {e}")
            
    print(f"Fetched {len(items)} items from Google News.")
    
    # Read existing titles to prevent duplicates
    existing_text = ""
    if os.path.exists('c:\\Users\\User\\WIPA-MAIN\\latnews.md'):
        with open('c:\\Users\\User\\WIPA-MAIN\\latnews.md', 'r', encoding='utf-8') as f:
            existing_text = f.read()
    
    results = []
    
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_item = {executor.submit(process_item, item): item for item in items}
        for future in as_completed(future_to_item):
            try:
                res = future.result()
                orig_title, t, b, img = res
                
                # Filter out bad entries
                words = b.lower().split()
                unique_words = set(words)
                if len(words) == 0 or (len(unique_words) / len(words)) < 0.3:
                    continue
                if 'error retrieving' in b.lower() or 'description is not available' in b.lower():
                    continue
                
                # Check for duplicates
                if t in existing_text or orig_title in existing_text:
                    continue
                    
                results.append((t, b, img))
            except Exception:
                pass
                
    with open('c:\\Users\\User\\WIPA-MAIN\\latnews.md', 'a', encoding='utf-8') as f:
        for t, b, img in results:
            f.write(f"## {t}\n")
            if img:
                f.write(f"![Image]({img})\n\n")
            else:
                f.write("*No image available*\n\n")
            f.write(f"{b}\n\n")
            
    print(f"Successfully appended {len(results)} new items to latnews.md.")

if __name__ == '__main__':
    main()
