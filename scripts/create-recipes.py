import ssl, json, urllib.request, time, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

env_path = r'C:\Users\unk_g\OneDrive\Área de Trabalho\namu-shopify\.env'
env = {}
with open(env_path, 'r') as f:
    for line in f:
        line = line.strip()
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            env[k.strip()] = v.strip()

store = env['SHOPIFY_STORE']
token = env['SHOPIFY_ACCESS_TOKEN']
api_version = env['SHOPIFY_API_VERSION']
blog_id = 'gid://shopify/Blog/96317145166'
api_url = f'https://{store}/admin/api/{api_version}/graphql.json'
headers = {'Content-Type': 'application/json', 'X-Shopify-Access-Token': token}


def create_article(title, body, tags, author='Namu Matcha'):
    mutation = """
    mutation articleCreate($article: ArticleCreateInput!) {
      articleCreate(article: $article) {
        article { id title handle }
        userErrors { field message }
      }
    }
    """
    variables = {
        'article': {
            'blogId': blog_id,
            'title': title,
            'author': {'name': author},
            'body': body,
            'tags': tags,
            'isPublished': True
        }
    }
    data = json.dumps({'query': mutation, 'variables': variables}).encode('utf-8')
    req = urllib.request.Request(api_url, data=data, headers=headers)
    resp = urllib.request.urlopen(req, context=ctx)
    return json.loads(resp.read().decode('utf-8'))


# Load recipes from JSON file
with open(r'C:\Users\unk_g\OneDrive\Área de Trabalho\namu-shopify\scripts\recipes-data.json', 'r', encoding='utf-8') as f:
    recipes = json.load(f)

print(f"Total recipes to create: {len(recipes)}")
print("=" * 50)

success = 0
errors = 0
for i, recipe in enumerate(recipes, 1):
    result = create_article(recipe['title'], recipe['body'], recipe['tags'])
    article_data = result.get('data', {}).get('articleCreate', {})
    user_errors = article_data.get('userErrors', [])
    if user_errors:
        print(f"[{i}] ERROR: {recipe['title']}")
        print(f"    {user_errors}")
        errors += 1
    else:
        article = article_data.get('article', {})
        print(f"[{i}] OK: {article.get('title')} -> /blogs/receitas-matcha/{article.get('handle')}")
        success += 1
    time.sleep(0.6)

print("=" * 50)
print(f"Done! {success} created, {errors} failed.")
