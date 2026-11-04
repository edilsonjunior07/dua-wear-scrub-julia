/* =====================================================================
   CONFIGURAÇÃO MESTRE DA LOJA - DUA WEAR (MODA PROFISSIONAL)
   PRODUTO: SCRUB JÚLIA VERDE FLORESTA (VALOR ÚNICO: R$ 279,00)
   ===================================================================== */

window.STORE_CONFIG = {
  // 1. DADOS DA LOJA / MARCA
  brand: {
    name: "Dua Wear",
    slogan: "Moda Profissional & Elegância para a Saúde",
    logoText: "DUA WEAR",
    logoImage: "images/logo.jpg", // Logotipo oficial Dua Wear
    cnpj: "51.348.902/0001-44",
    address: "Rua Oscar Freire, 1200 - Cerqueira César, São Paulo - SP, 01426-001",
    email: "contato@duawear.com.br",
    whatsapp: "5511999999999",
    whatsappMessage: "Olá! Gostaria de tirar uma dúvida sobre o Scrub Júlia Verde Floresta da Dua Wear.",
    hours: "Seg à Sex: 08h às 19h | Sáb: 09h às 14h",
    about: "A Dua Wear nasceu para transformar o vestuário profissional da saúde. Unimos alta alfaiataria médica com tecidos tecnológicos com elastano que não amassam, valorizando a postura, a elegância e o conforto absoluto de quem cuida de vidas."
  },

  // 2. CONFIGURAÇÕES DA CAMPANHA DE DESCONTO / URGÊNCIA
  campaign: {
    label: "COLEÇÃO EXCLUSIVA 2026",
    discountBadge: "28% OFF",
    offerEndsAt: "2026-11-30T23:59:59-03:00",
    topbarText: "FRETE GRÁTIS PARA TODO O BRASIL + 1ª TROCA 100% GRÁTIS"
  },

  // 3. PRODUTO PRINCIPAL (FOTOS REAIS DA MODELO EM ALTA RESOLUÇÃO)
  product: {
    title: "Scrub Júlia Verde Floresta - Pijama Cirúrgico Premium com Manga Tulipa e Ajuste na Cintura",
    shortTitle: "Scrub Júlia Verde Floresta",
    category: "Moda Médica & Saúde / Linha Cirúrgica Feminina",
    rating: "4.9",
    ratingCount: "1.842",
    clientsCount: "+18.000 profissionais",
    warranty: "Garantia 30 Dias + 1ª Troca Grátis",
    
    // Imagens oficiais da modelo vestindo o Scrub Júlia Verde Floresta
    images: [
      {
        src: "images/scrub-hd-1.jpg",
        alt: "Scrub Júlia Verde Floresta Dua Wear - Modelo Frente Cintura",
        thumb: "images/scrub-hd-1.jpg"
      },
      {
        src: "images/scrub-hd-2.jpg",
        alt: "Detalhe da Gola em V, Manga Tulipa e Acabamento da Blusa",
        thumb: "images/scrub-hd-2.jpg"
      },
      {
        src: "images/scrub-hd-3.jpg",
        alt: "Caimento Elegante de Corpo Inteiro da Calça e Blusa",
        thumb: "images/scrub-hd-3.jpg"
      }
    ]
  },

  // 4. OFERTA EXCLUSIVA COM VALOR ÚNICO DE R$ 279,00
  offers: [
    {
      id: "conjunto-completo",
      label: "Conjunto Scrub Júlia Completo (Blusa Tulipa + Calça Confort)",
      sub: "Modelagem acinturada com manga tulipa, 4 bolsos funcionais e tecido que não amassa",
      badge: "OFERTA EXCLUSIVA • FRETE GRÁTIS",
      price: 27900,        // R$ 279,00 em centavos
      compareAt: 38900,    // De R$ 389,00
      save: 11000,         // Economize R$ 110,00
      image: "images/scrub-hd-1.jpg",
      features: "Conjunto Completo (Blusa + Calça) + 1ª Troca 100% Grátis + Envio Expresso com Seguro",
      checkoutUrl: "https://checkout.duawear.com.br/c/scrub-julia-verde-floresta"
    }
  ],
  defaultOfferId: "conjunto-completo",

  // 5. SELETOR DE VARIAÇÕES (TAMANHOS E CORES)
  variants: [
    {
      group: "Tamanho",
      type: "button",
      options: [
        { id: "pp", label: "PP (veste 34/36)" },
        { id: "p", label: "P (veste 38)" },
        { id: "m", label: "M (veste 40/42)", selected: true },
        { id: "g", label: "G (veste 44)" },
        { id: "gg", label: "GG (veste 46)" }
      ]
    },
    {
      group: "Cor",
      type: "color",
      options: [
        { id: "verde-floresta", label: "Verde Floresta (Foto da Modelo)", colorCode: "#1e4938", selected: true }
      ]
    }
  ],

  // 6. ORDER BUMP NO MODAL DE CONFIRMAÇÃO (UPSELL DE 1 CLIQUE)
  orderBump: {
    enabled: true,
    title: "Adicionar Touca Cirúrgica Estilizada na Mesma Cor + Porta-Estetoscópio",
    description: "Complete seu look profissional com a touca anatômica coordenada com elástico confortável.",
    price: 2490, // R$ 24,90
    compareAt: 5990,
    checkoutParam: "order_bump=touca_estilizada_verde"
  },

  // 7. PARCELAMENTO
  installments: {
    max: 12,
    noInterest: 3 // 3x de R$ 93,00 sem juros
  },

  // 8. DESTAQUES RÁPIDOS DA BUYBOX (CHECKMARKS VERDES)
  highlights: [
    "Tecido Two Way Premium com Elastano: Não amassa, não desbota e não precisa passar",
    "Manga Tulipa Feminina: Liberdade total para procedimentos sem prender nem apertar os braços",
    "Ajuste Anatômico na Cintura: Faixa posterior para você regular o caimento perfeito no seu corpo",
    "4 Bolsos Estratégicos: Espaço sob medida para celular, canetas, carimbo e termômetro",
    "Garantia de Ajuste Perfeito: 1ª Troca 100% Grátis sem nenhum custo de frete"
  ],

  // 9. TABELA COMPARATIVA (DUA WEAR VS SCRUBS TRADICIONAIS)
  comparison: {
    title: "Por que o Scrub Júlia da Dua Wear é diferente?",
    subtitle: "Diga adeus aos scrubs retos sem corte que amassam na primeira hora de plantão.",
    columns: ["Recurso", "Scrub Júlia Dua Wear", "Scrubs Hospitalares Comuns"],
    rows: [
      { feature: "Tecido que Não Amassa", our: "Tecnologia Easy Care (plantão impecável)", others: "Amassa e amarrota em 30 minutos", ourOk: true },
      { feature: "Modelagem Feminina", our: "Corte acinturado com laço ajustável", others: "Corte reto sem forma estilo 'saco'", ourOk: true },
      { feature: "Mobilidade dos Braços", our: "Manga Tulipa sobreposta (zero atrito)", others: "Manga reta que prende na elevação", ourOk: true },
      { feature: "Resistência a Lavagens", our: "Cor Verde Floresta viva que não desbota", others: "Fica desbotado e com aspecto velho", ourOk: true },
      { feature: "Segurança de Tamanho", our: "Primeira Troca 100% Grátis", others: "Troca burocrática ou frete por sua conta", ourOk: true }
    ]
  },

  // 10. BENEFÍCIOS EM CARDS COM ÍCONES
  benefits: [
    {
      icon: "heart",
      title: "Modelagem Acinturada Anatômica",
      text: "Projetado com corte alfaiataria e faixa posterior regulável que valoriza a silhueta feminina mantendo a elegância e a discrição no ambiente de trabalho."
    },
    {
      icon: "bolt",
      title: "Tecido Two Way com Elastano",
      text: "Composição premium com elastano que acompanha todos os seus movimentos em cirurgias, exames e atendimentos, proporcionando frescor durante todo o plantão."
    },
    {
      icon: "shield",
      title: "Tecnologia Easy Care (Não Passa)",
      text: "Lave na máquina, pendure no cabide e pronto: vista direto sem perder tempo passando ferro. Não amarrota nem perde o brilho após lavagens frequentes."
    },
    {
      icon: "truck",
      title: "Primeira Troca 100% Grátis",
      text: "Compre com total segurança: se o tamanho PP, P, M, G ou GG não ficar perfeito, realizamos a primeira troca sem nenhum custo de frete."
    }
  ],

  // 11. ESPECIFICAÇÕES TÉCNICAS
  specs: [
    ["Tecido", "Two Way Premium com Elastano (96% Poliéster / 4% Spandex)"],
    ["Gramatura", "180 g/m² (Toque encorpado, zero transparência e muito fresco)"],
    ["Manga", "Modelagem Tulipa feminina sobreposta"],
    ["Gola", "Decote em V elegante com pesponto reforçado"],
    ["Ajuste de Cintura", "Faixa nas costas para amarração personalizada"],
    ["Bolsos", "2 na blusa e 2 na calça com profundidade para smartphone"],
    ["Cós da Calça", "Elástico total com cordão de ajuste interno"],
    ["Cor Oficial", "Verde Floresta (Conforme fotos da modelo)"]
  ],

  // 12. O QUE VEM NA CAIXA
  whatsInTheBox: [
    "1x Blusa Scrub Júlia com Manga Tulipa e Ajuste Posterior",
    "1x Calça Confort com Bolsos Funcionais e Cós Anatômico",
    "Embalagem personalizada Dua Wear com aroma exclusivo de consultório",
    "Manual de cuidados e conservação do tecido",
    "Certificado de Garantia e Cupom de 1ª Troca Grátis"
  ],

  // 13. PROVA INSTITUCIONAL / BASTIDORES
  trustSection: {
    title: "Empresa com Estrutura Real e Envio Garantido",
    subtitle: "Mais de 18.000 profissionais de saúde vestem Dua Wear em todo o Brasil. Qualidade de alfaiataria médica com entrega rápida.",
    items: [
      { icon: "truck", title: "Envio em até 24h", text: "Estoque próprio com despacho rápido e código de rastreamento Correios." },
      { icon: "shield", title: "1ª Troca 100% Grátis", text: "Se o tamanho não ficar perfeito, trocamos sem você pagar nada de frete." },
      { icon: "lock", title: "Pagamento Blindado", text: "Processamento seguro com criptografia bancária SSL de 256 bits." },
      { icon: "headset", title: "Suporte Especializado", text: "Atendimento dedicado por consultoras de moda médica no WhatsApp." }
    ]
  },

  // 14. AVALIAÇÕES REAIS DE CLIENTES COM FOTOS
  reviews: [
    {
      name: "Dra. Letícia Camargo",
      city: "São Paulo, SP - Médica Dermatologista",
      verified: true,
      stars: 5,
      date: "Há 2 dias",
      avatar: "https://images.unsplash.com/photo-1594824813571-638f02614d3f?auto=format&fit=crop&w=100&q=80",
      photo: "images/scrub-hd-1.jpg",
      text: "O Verde Floresta é a cor mais sofisticada que já usei! Minhas pacientes no consultório elogiaram muito a elegância da manga tulipa. A faixa nas costas deixa a cintura linda sem apertar. E o melhor de tudo: saio de um plantão de 12h e ele continua sem nenhum amassado."
    },
    {
      name: "Dra. Beatriz Fontana",
      city: "Belo Horizonte, MG - Cirurgiã-Dentista",
      verified: true,
      stars: 5,
      date: "Há 4 dias",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80",
      photo: "images/scrub-hd-2.jpg",
      text: "O caimento é surreal de perfeito! Tenho quadril largo e ombro estreito e a modelagem se adaptou perfeitamente. O tecido é macio, encorpado e não esquenta durante os procedimentos cirúrgicos."
    },
    {
      name: "Enfª. Gabriela Rezende",
      city: "Curitiba, PR - Enfermeira de UTI",
      verified: true,
      stars: 5,
      date: "Há 1 semana",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
      photo: "images/scrub-hd-3.jpg",
      text: "Trabalho em UTI e preciso de muita mobilidade. A manga tulipa faz toda a diferença nos movimentos de punção e manuseio dos pacientes. Chegou super rápido e muito cheiroso!"
    },
    {
      name: "Dra. Carolina Mendes",
      city: "Rio de Janeiro, RJ - Médica Veterinária",
      verified: true,
      stars: 5,
      date: "Há 1 semana",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      photo: "",
      text: "Excelente acabamento, costuras reforçadas e bolsos profundos que realmente cabem o celular sem cair. A Dua Wear está de parabéns, já virei cliente fiel."
    }
  ],

  // 15. FAQ (PERGUNTAS FREQUENTES)
  faq: [
    [
      "O tecido do Scrub Júlia precisa passar a ferro?",
      "NÃO! Nosso tecido Two Way com elastano conta com a tecnologia Easy Care. Ao lavar, basta estender no cabide e ele seca alinhado, pronto para vestir direto no plantão sem amassar ao longo do dia."
    ],
    [
      "E se o tamanho PP, P, M, G ou GG não servir?",
      "Fique 100% tranquila: nós oferecemos a PRIMEIRA TROCA TOTALMENTE GRÁTIS! Se o tamanho não ficar perfeito no seu corpo, nossa equipe gera a etiqueta dos Correios sem nenhum custo para você trocar pelo tamanho ideal."
    ],
    [
      "A manga tulipa aperta ou limita os movimentos dos braços?",
      "Pelo contrário! A modelagem tulipa é formada por pétalas sobrepostas projetadas justamente para dar liberdade anatômica total na hora de examinar, operar ou realizar procedimentos, sem puxar nem prender os braços."
    ],
    [
      "A cor Verde Floresta desbota nas lavagens frequentes?",
      "Não. O tingimento de alta fixação foi desenvolvido para resistir a lavagens hospitalares frequentes, mantendo a tonalidade verde floresta intensa e sofisticada por muito mais tempo."
    ],
    [
      "Qual é o prazo de entrega?",
      "O prazo médio de entrega é de 4 a 8 dias úteis para todo o Brasil. Você receberá o código de rastreamento no WhatsApp e no e-mail assim que o pedido for despachado."
    ],
    [
      "Quais são as formas de pagamento?",
      "Aceitamos PIX com aprovação imediata e envio prioritário, Cartão de Crédito em até 12x (em até 3x sem juros de R$ 93,00) e Boleto Bancário. Todas as transações são 100% seguras com criptografia bancária SSL."
    ]
  ],

  // 16. POPUPS DE PROVA SOCIAL AO VIVO (VENDAS RECENTES)
  salesNotifications: [
    { name: "Dra. Letícia C.", city: "São Paulo - SP", product: "Scrub Júlia Verde Floresta (M)", time: "há 3 minutos" },
    { name: "Dra. Mariana F.", city: "Belo Horizonte - MG", product: "Scrub Júlia Verde Floresta (P)", time: "há 7 minutos" },
    { name: "Enfª. Camila S.", city: "Curitiba - PR", product: "Scrub Júlia Verde Floresta (G)", time: "há 12 minutos" },
    { name: "Dra. Patrícia B.", city: "Rio de Janeiro - RJ", product: "Scrub Júlia Verde Floresta (PP)", time: "há 18 minutos" }
  ]
};
