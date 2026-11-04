# 🚀 Template de Loja / Landing Page de Dropshipping de Alta Conversão

> **Estrutura baseada e aprimorada a partir do modelo da Nexus Carpete / Bruttus.**  
> Desenvolvida para ser **100% universal e aplicável a qualquer produto físico ou digital** em poucos minutos.

---

## 📁 Estrutura de Arquivos

```text
template-loja-drop/
├── index.html          # Estrutura HTML semântica com SVG Sprite autossuficiente
├── css/
│   └── styles.css      # Design System completo com Variáveis CSS (:root) e Responsividade
├── js/
│   ├── config.js       # ⚡ ARQUIVO MESTRE: Edite aqui para configurar QUALQUER produto!
│   └── app.js          # Motor JavaScript dinâmico (Kits, CEP, Variações, Modais, UTMs)
└── README.md           # Guia de uso e personalização
```

---

## ⚡ Como Aplicar em QUALQUER Produto em 3 Passos

### Passo 1: Abra o arquivo `js/config.js`
Toda a inteligência da página é controlada por este único arquivo. Nele você altera:

- **Dados da Marca (`brand`)**: Nome, logotipo, WhatsApp de suporte, CNPJ e endereço.
- **Campanha (`campaign`)**: Texto da barra superior, data final do cronômetro de urgência e selo de desconto.
- **Produto (`product`)**: Título, categoria, nota de avaliação (ex: 4.9), quantidade de clientes e galeria de fotos.
- **Kits Promocionais (`offers`)**:
  - Ex: *1 Unidade*, *Leve 2 (Mais Vendido)*, *Leve 3 (Combo Família)*.
  - Preços em centavos (ex: `R$ 147,90` = `14790`), economia calculada e links de checkout de cada kit.
- **Variações (`variants`)**:
  - Configure cores, tamanhos, modelos ou voltagens facilmente.
- **Order Bump / Upsell (`orderBump`)**:
  - Oferta complementar no modal de confirmação (ex: Película, Garantia Estendida, Acessório com 1 clique).
- **Prova Social e Avaliações (`reviews`)**:
  - Depoimentos reais ou modelados com fotos de clientes, estrelas e cidades brasileiras.
- **FAQ (`faq`)**:
  - Perguntas e respostas mais comuns sobre prazo, garantia e devolução.

---

### Passo 2: Altere as Cores da Loja (Opcional)
No início do arquivo `css/styles.css`, você encontra a seção `:root`. Basta alterar duas linhas para transformar a identidade visual da sua loja:

```css
:root {
  --primary: #0b3165;       /* Cor de autoridade (azul escuro, verde militar, grafite...) */
  --accent: #1763cf;        /* Cor do botão de compra e destaques */
  --accent-hover: #0b4592;  /* Cor ao passar o mouse */
}
```

---

### Passo 3: Conecte o seu Checkout (Yampi, CartPanda, Shopify, Appmax, Vega, etc.)
Em `js/config.js`, no array `offers`, basta colar o link de checkout do seu gateway ou plataforma:

```javascript
offers: [
  {
    id: "kit-2",
    label: "LEVE 2 UNIDADES (Mais Vendido)",
    price: 24790,
    checkoutUrl: "https://checkout.sualoja.com/c/seu-link-aqui"
  }
]
```

> **🔥 Repasse Automático de UTMs (Sem perda de dados de tráfego pago):**  
> O script `app.js` captura automaticamente todos os parâmetros de anúncio presentes na URL (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `src`, `sck`) e os injeta no link do seu checkout no momento do clique.

---

## 🏆 Gatilhos e Recursos de Conversão Inclusos

1. **Barra Superior com Cronômetro Regressivo**: Gera urgência e escassez imediata com contagem regressiva em tempo real.
2. **Selo Oficial de Produto Verificado**: Ícone azul de verificação ao lado do título do produto para autoridade máxima.
3. **Contador de Visitantes ao Vivo**: Exibe *"🔥 24 pessoas estão vendo este produto agora"* com variação natural a cada poucos segundos.
4. **Kits com Desconto Progressivo**: Induz o cliente a escolher o kit de maior valor (Mais Vendido / Combo).
5. **Seletor Visual de Variações**: Suporte a bolinhas de cores e botões de tamanhos/modelos com feedback em tempo real.
6. **Simulador de CEP Real**: Conectado à API oficial dos Correios (ViaCEP) – mostra o nome da cidade e estado do cliente na hora com selo de *Frete Grátis*.
7. **Botão de Compra Magnético com Shimmer**: Efeito de brilho contínuo que atrai o clique do usuário.
8. **Modal de Confirmação com Order Bump (Upsell)**: Quando o cliente clica em comprar, abre uma janela resumindo a escolha com opção de adicionar um item complementar por R$ 19,90 antes de ir pro checkout.
9. **Barra Fixa Inferior Mobile (Sticky Buy Bar)**: No celular, ao rolar a página para baixo, surge uma barra fixa com foto, preço e botão rápido de compra.
10. **Popups de Notificações de Vendas Recentes**: Notificações flutuantes no canto da tela (*"Rodrigo M. de São Paulo comprou há 3 minutos"*).
11. **Tabela Comparativa**: Seção visual destacando os diferenciais do seu produto contra os concorrentes comuns do mercado.
12. **Galeria Interativa com Lightbox**: Zoom suave e modal de visualização em tela cheia com setas de navegação.
13. **Botão Flutuante do WhatsApp**: Conexão direta com suporte humanizado para fechamento de vendas de clientes inseguros.

---

## 🌐 Como Publicar

1. **Hospedagem Gratuita**: Arraste a pasta para o [Vercel](https://vercel.com), [Netlify](https://netlify.com) ou [Cloudflare Pages].
2. **Hospedagem Tradicional**: Envie os arquivos via FTP / cPanel para qualquer domínio (Hostinger, Locaweb, etc.).
3. **Página de Produto no Shopify / Nuvemshop**: Você pode hospedar como um subdomínio (ex: `oferta.sualoja.com.br`) apontando para esta landing page.
