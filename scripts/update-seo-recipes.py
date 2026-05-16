import ssl, json, urllib.request, time, io, sys

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
blog_id = 96317145166

# SEO data for each recipe (by handle)
seo_data = {
    "nhoque-de-matcha-uma-janta-especial-com-toque-verde": {
        "title": "Receita de Nhoque de Matcha | Janta Especial | Namu Matcha",
        "desc": "Aprenda a fazer nhoque de matcha caseiro com massa verde vibrante, manteiga de sálvia e parmesão. Receita fácil e sofisticada para um jantar especial."
    },
    "tostada-de-ricota-com-matcha-opcao-diferente-para-o-seu-lanche": {
        "title": "Tostada de Ricota com Matcha | Brunch Saudável | Namu Matcha",
        "desc": "Receita de tostada gourmet com ricota de macadâmia e matcha, avocado, figo grelhado e tomate confit. Perfeita para um brunch sofisticado e nutritivo."
    },
    "crudo-de-peixe-com-matcha-sofisticacao-na-simplicidade": {
        "title": "Crudo de Peixe com Azeite de Matcha | Receita Gourmet | Namu",
        "desc": "Receita de crudo de peixe branco com azeite de matcha artesanal. Prato sofisticado, leve e cheio de sabor para impressionar em jantares especiais."
    },
    "ganache-de-matcha-doce-bonito-e-irresistivel": {
        "title": "Ganache de Matcha com Chocolate Branco | Sobremesa | Namu",
        "desc": "Receita de ganache de matcha com chocolate branco e castanha de caju. Sobremesa fácil, elegante e perfeita para presentear ou saborear em casa."
    },
    "cookie-levain-de-matcha-crocante-por-fora-macio-por-dentro": {
        "title": "Cookie Levain de Matcha | Receita Crocante e Macia | Namu",
        "desc": "Receita de cookie levain de matcha: crocante por fora, macio por dentro, com chocolate e nozes. O cookie perfeito para amantes de matcha."
    },
    "mousse-rapida-de-matcha-facilidade-e-muito-sabor": {
        "title": "Mousse Rápida de Matcha | Sobremesa em 15 Minutos | Namu",
        "desc": "Receita de mousse de matcha com chocolate branco e cream cheese. Sobremesa rápida, cremosa e sofisticada pronta em poucos minutos."
    },
    "french-toast-de-matcha-cafe-da-manha-especial": {
        "title": "French Toast de Matcha | Café da Manhã Especial | Namu",
        "desc": "Receita de french toast de matcha: pão brioche cremoso com matcha, caramelizado na frigideira. Perfeito para um brunch elegante em casa."
    },
    "matcha-cerimonial-o-preparo-tradicional-perfeito": {
        "title": "Como Preparar Matcha Cerimonial | Receita Tradicional | Namu",
        "desc": "Aprenda o preparo tradicional do matcha cerimonial com chasen e água a 75°C. Passo a passo para uma experiência autêntica e cremosa."
    },
    "hojicha-latte-quente-o-abraco-que-voce-nao-sabia-que-precisava": {
        "title": "Hojicha Latte Quente | Receita Cremosa e Reconfortante | Namu",
        "desc": "Receita de hojicha latte quente com notas de cacau e nozes. Bebida cremosa, baixa em cafeína, perfeita para qualquer hora do dia."
    },
    "matcha-latte-quente-a-bebida-que-faltava-na-sua-pausa-diaria": {
        "title": "Matcha Latte Quente | Receita Cremosa Perfeita | Namu Matcha",
        "desc": "Aprenda a fazer matcha latte quente cremoso em casa. Receita com matcha cerimonial e leite espumado para uma pausa revigorante no seu dia."
    },
    "mojito-matcha-o-classico-com-um-toque-verde": {
        "title": "Mojito Matcha Sem Álcool | Drink Refrescante | Namu Matcha",
        "desc": "Receita de mojito matcha: refrescante, cítrico e com energia do matcha. Drink sem álcool perfeito para dias quentes e momentos especiais."
    },
    "bubble-tea-de-matcha-com-sagu-divertido-e-cheio-de-sabor": {
        "title": "Bubble Tea de Matcha com Sagu | Receita Divertida | Namu",
        "desc": "Receita de bubble tea de matcha com pérolas de sagu. Bebida cremosa, divertida e cheia de textura para surpreender no verão."
    },
    "strawberry-matcha-a-docura-do-morango-com-a-intensidade-do-matcha": {
        "title": "Strawberry Matcha | Morango com Matcha | Receita Namu",
        "desc": "Receita de strawberry matcha: camadas de compota de morango, leite gelado e matcha shot. Bebida linda, doce e refrescante para o seu dia."
    },
    "matcha-leite-de-coco-com-hortela-tropical-refrescante-e-vegano": {
        "title": "Matcha com Leite de Coco e Hortelã | Vegano | Namu Matcha",
        "desc": "Receita vegana de matcha com leite de coco e hortelã. Bebida tropical, refrescante e leve, perfeita para dias quentes de verão."
    },
    "matcha-frappe-a-sobremesa-gelada-que-virou-bebida": {
        "title": "Matcha Frappe | Bebida Gelada Cremosa | Receita Namu Matcha",
        "desc": "Receita de matcha frappe cremoso com leite condensado e chantilly. A sobremesa gelada perfeita para matar a vontade de doce no calor."
    },
    "gin-tonica-de-matcha-um-twist-elegante-no-classico-sem-alcool": {
        "title": "Gin Tônica de Matcha Sem Álcool | Drink Sofisticado | Namu",
        "desc": "Receita de gin tônica de matcha sem álcool: tônica, laranja e matcha em camadas. Drink elegante e refrescante para momentos especiais."
    },
    "energetico-natural-de-matcha-energia-limpa-para-o-seu-dia": {
        "title": "Energético Natural de Matcha | Pré-Treino Saudável | Namu",
        "desc": "Receita de energético natural com matcha, caldo de cana e gengibre. Energia limpa e sustentada para treinos e dias intensos, sem artificiais."
    },
    "hojicha-iced-latte-baixo-em-cafeina-e-alto-em-sabor": {
        "title": "Hojicha Iced Latte | Baixa Cafeína e Muito Sabor | Namu",
        "desc": "Receita de hojicha iced latte gelado com notas de cacau e nozes. Bebida com baixo teor de cafeína, ideal para qualquer hora do dia."
    },
    "lemon-soda-matcha-refrescancia-do-inicio-ao-fim": {
        "title": "Lemon Soda Matcha | Bebida Cítrica Refrescante | Namu Matcha",
        "desc": "Receita de lemon soda matcha: água com gás, limão e matcha. Bebida cítrica e refrescante pronta em 3 minutos para o verão."
    },
    "maracumatcha-das-nossas-criacoes-brasileirissimas": {
        "title": "Maracumatcha | Matcha com Maracujá | Receita Brasileira | Namu",
        "desc": "Receita de maracumatcha: suco de maracujá fresco com matcha shot. Criação brasileira refrescante e relaxante, perfeita como alternativa a drinks."
    },
    "panquecas-de-matcha": {
        "title": "Panquecas de Matcha | Café da Manhã Funcional | Namu Matcha",
        "desc": "Receita de panquecas de matcha fofas e verdes. Café da manhã funcional, nutritivo e delicioso com o sabor único do matcha."
    }
}

# Get all articles
headers_rest = {'X-Shopify-Access-Token': token, 'Content-Type': 'application/json'}
get_url = f'https://{store}/admin/api/{api_version}/blogs/{blog_id}/articles.json?limit=25'
req = urllib.request.Request(get_url, headers=headers_rest)
resp = urllib.request.urlopen(req, context=ctx)
articles = json.loads(resp.read().decode('utf-8'))['articles']

print(f"Found {len(articles)} articles. Updating SEO...")
print("=" * 50)

success = 0
for art in articles:
    handle = art['handle']
    if handle in seo_data:
        seo = seo_data[handle]
        put_url = f'https://{store}/admin/api/{api_version}/blogs/{blog_id}/articles/{art["id"]}.json'
        payload = {
            "article": {
                "id": art["id"],
                "metafields_global_title_tag": seo["title"],
                "metafields_global_description_tag": seo["desc"]
            }
        }
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(put_url, data=data, headers=headers_rest, method='PUT')
        resp = urllib.request.urlopen(req, context=ctx)
        r = json.loads(resp.read().decode('utf-8'))
        print(f"OK: {art['title'][:50]}")
        print(f"    title: {seo['title'][:60]}")
        success += 1
        time.sleep(0.4)
    else:
        print(f"SKIP: {handle} (no SEO data)")

print("=" * 50)
print(f"Updated SEO for {success} articles.")
