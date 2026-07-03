# Análise de Estilo Visual - Canal Twitch

## Estilo Identificado nas Imagens
- **Tema:** Pixel Art Medieval / Fantasia Sombria.
- **Paleta de Cores Dominante:**
  - Vermelho Profundo / Vinho (#4a0404, #800000)
  - Dourado Envelhecido / Bronze (#b8860b, #8b7355)
  - Preto / Cinza Escuro (#1a1a1a, #000000)
  - Toques de Roxo/Azul para itens especiais (pedras de upgrade).
- **Elementos Visuais:**
  - Bordas ornamentadas e duplas.
  - Efeitos de brilho (glow) em itens importantes.
  - Fontes clássicas/serifadas (Cinzel, Crimson Text já estão em uso, mas podem ser melhor aplicadas).
  - Personagem icônico: Uma concha com óculos escuros e bigode (estilo "Thug Life").

## Problemas Apontados pelo Usuário
- **Cores:** O vermelho atual está "muito forte que chega a doer os olhos".
- **Fundo:** Deseja um fundo temático com desfoque (blur).
- **Interface:** Seção de quests (onde coloca valor dos itens) está "feia".
- **Geral:** Botões, labels e interface precisam de um toque mais profissional e coeso.

## Nova Proposta Visual
- **Fundo:** Imagem gerada por IA baseada no tema da Twitch, aplicada com `backdrop-filter: blur(8px)` ou já desfocada.
- **Paleta Refinada:** 
  - Substituir o vermelho vibrante por um **Vermelho Carmesim Profundo** ou **Vinho** para detalhes, mantendo a sobriedade.
  - Usar **Dourado Suave** (#d4af37) apenas para destaques e bordas finas.
  - Fundo dos painéis com transparência (glassmorphism) para mostrar o fundo desfocado.
- **Botões:** Estilo "pedra" ou "metal" com bordas chanfradas e hover suave.
- **Inputs:** Melhorar o contraste e o padding, removendo bordas excessivas e usando sombras internas.
