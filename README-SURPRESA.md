# Site romântico — surpresa personalizada

Site estático em **HTML5, CSS3 e JavaScript puro** para contar a história do casal com fotos, textos e música.

> Este repositório também contém o app Next.js (Chapada Conectada). O site da surpresa é **independente**: use os arquivos na **raiz** (`index.html`, `css/`, `js/`, `assets/`).  
> Se preferir um pacote só da surpresa, copie essas pastas/arquivos para uma pasta nova e renomeie este arquivo para **`README.md`**.

## Estrutura

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── scripts/
│   └── update-gallery-manifest.js   ← opcional: lista fotos automaticamente
├── assets/
│   ├── images/
│   │   ├── manifest.json
│   │   ├── favicon.svg
│   │   └── (suas fotos)
│   └── music/
│       └── nossa-musica.mp3
└── README-SURPRESA.md               ← este guia (README.md no pacote exportado)
```

## Como visualizar

Abra **`index.html`** no navegador (duplo clique).

Para a galeria carregar o `manifest.json` sem restrições, use um servidor local na pasta do site:

```bash
npx --yes serve -p 3333
```

Acesse: `http://localhost:3333`

Se abrir só com `file://` e o manifest não carregar, a galeria usa placeholders padrão.

## Fotos (`assets/images/`)

1. Copie suas imagens (`.jpg`, `.png`, `.webp`, etc.) para **`assets/images/`**.
2. Atualize a lista de uma destas formas:
   - **Automático (recomendado):** na raiz do site, rode  
     `node scripts/update-gallery-manifest.js`
   - **Manual:** edite **`assets/images/manifest.json`** com os nomes exatos dos arquivos.

3. **Foto grande no final:** em **`js/script.js`**, altere:

```javascript
const FINAL_COUPLE_IMAGE = "sua-foto-casal.jpg";
```

(Esse arquivo não entra na galeria automaticamente.)

## Música (`assets/music/nossa-musica.mp3`)

1. Coloque o MP3 em **`assets/music/nossa-musica.mp3`**.
2. Outro caminho/nome: edite **`MUSIC_PATH`** em **`js/script.js`**.

A música **só inicia** após clicar em **“Entrar na nossa história”** (política de autoplay dos navegadores).

## Personalização rápida

| O quê | Onde |
|--------|------|
| Data do relacionamento | `js/script.js` → `const dataInicio = new Date("AAAA-MM-DDTHH:MM:SS");` |
| Linha do tempo | `js/script.js` → array `TIMELINE` |
| Tela inicial / frase especial / final | `index.html` |
| Carta | `index.html` → bloco `#carta-conteudo` (comentário `EDITE A CARTA`) |
| Favicon | `assets/images/favicon.svg` ou `link rel="icon"` no `index.html` |

## Publicar

Envie `index.html`, `css/`, `js/`, `assets/` (e `scripts/` se quiser) para qualquer hospedagem estática. Não precisa de Node em produção.

---

Boa surpresa.
