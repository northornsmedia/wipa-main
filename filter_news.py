import re

with open('c:\\Users\\User\\WIPA-MAIN\\latnews.md', 'r', encoding='utf-8') as f:
    content = f.read()

entries = content.split('## ')
header = entries[0]
valid_entries = []

for entry in entries[1:]:
    lines = entry.strip().split('\n')
    if len(lines) >= 3:
        title = lines[0].strip()
        brief = lines[-1].strip()
        
        words = brief.lower().split()
        unique_words = set(words)
        
        # If it has very low uniqueness, it is extremely padded (e.g. repeated titles 4-5 times)
        # Let's say if it's less than 30% unique words, it's padded.
        if len(words) > 0 and (len(unique_words) / len(words)) < 0.3:
            continue
            
        # If it says Error retrieving, skip it
        if 'error retrieving' in brief.lower() or 'description is not available' in brief.lower():
            continue
            
        valid_entries.append('## ' + entry)

with open('c:\\Users\\User\\WIPA-MAIN\\latnews.md', 'w', encoding='utf-8') as f:
    f.write(header)
    for v in valid_entries:
        f.write(v + '\n\n')

print(f'Kept {len(valid_entries)} out of {len(entries)-1} items')
