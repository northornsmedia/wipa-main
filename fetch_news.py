import urllib.request
import xml.etree.ElementTree as ET
import urllib.parse
import sys

def fetch_google_news():
    query = 'site:asiaiplaw.com OR site:managingip.com OR site:trademarklawyermagazine.com'
    url = f"https://news.google.com/rss/search?q={urllib.parse.quote(query)}&hl=en-US&gl=US&ceid=US:en"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            xml_data = response.read()
            
        root = ET.fromstring(xml_data)
        items = root.findall('.//item')
        
        with open('latnews.md', 'w', encoding='utf-8') as f:
            f.write('# Top Latest News\n\n')
            count = 0
            for item in items:
                if count >= 100:
                    break
                title = item.find('title').text if item.find('title') is not None else 'No Title'
                desc = item.find('description').text if item.find('description') is not None else 'No Description'
                
                # Description from Google News RSS usually contains HTML, strip it if necessary or just write it
                # We can do a quick strip HTML tags:
                import re
                desc_text = re.sub('<[^<]+>', '', desc)
                
                f.write(f"## {title}\n")
                f.write(f"{desc_text}\n\n")
                count += 1
                
        print(f"Successfully wrote {count} news articles to latnews.md")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    fetch_google_news()
