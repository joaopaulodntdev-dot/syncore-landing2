
/* =====================================================
   SYNCORE — JavaScript Principal
   Arquivo: js/main.js

   📌 COMO FUNCIONA O JAVASCRIPT:
   O JS adiciona COMPORTAMENTO à sua página.
   Enquanto o HTML é a estrutura e o CSS é a aparência,
   o JavaScript faz as coisas ACONTECEREM:
   - Animações ao rolar a página
   - Menus que abrem/fecham
   - Botões que respondem a cliques
   - Conteúdo que muda dinamicamente
===================================================== */


/* ─────────────────────────────────────────────────
   1. ANIMAÇÃO DE SCROLL (Intersection Observer)

   📌 O QUE É:
   O IntersectionObserver "observa" elementos na página.
   Quando um elemento entra na área visível da tela,
   ele dispara uma função — usamos isso para adicionar
   a classe "visible" e fazer o elemento aparecer.

   📌 COMO FUNCIONA NA PRÁTICA:
   - Todo elemento com classe "fade-in" começa invisível (opacity: 0)
   - Quando o usuário rola e ele aparece na tela,
     o observer adiciona "visible" automaticamente
   - O CSS já tem a transição suave configurada
───────────────────────────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Se o elemento está visível na tela...
      if (entry.isIntersecting) {
        // ...adiciona a classe "visible" para ativar a animação
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.1, // Ativa quando 10% do elemento está visível
  }
);

// Seleciona TODOS os elementos com classe "fade-in" e os observa
document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));


/* ─────────────────────────────────────────────────
   2. NAVBAR — Muda aparência ao rolar

   📌 O QUE FAZ:
   Quando o usuário rola mais de 50px para baixo,
   a navbar fica um pouco mais escura/opaca.
   Dá um efeito visual profissional.
───────────────────────────────────────────────── */
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    // Rolou: deixa navbar mais sólida
    navbar.style.background = 'rgba(6, 12, 26, 0.97)';
  } else {
    // No topo: mantém transparente
    navbar.style.background = 'rgba(6, 12, 26, 0.85)';
  }
});


/* ─────────────────────────────────────────────────
   3. ANIMAÇÃO DOS NÚMEROS (Counter Animation)

   📌 O QUE FAZ:
   Quando os números de estatística aparecem na tela
   (ex: "50+", "98%", "3x"), eles contam de 0 até o
   valor final. Cria um efeito visual impactante.

   📌 COMO USAR:
   Adicione data-target="NUMERO" nos elementos .stat-num
   no HTML. Ex: <span class="stat-num" data-target="50">50+</span>
───────────────────────────────────────────────── */
function animateCounter(element) {
  const target = parseInt(element.dataset.target); // Pega o número final do atributo
  const suffix = element.dataset.suffix || '';     // Sufixo: "+", "%", "x", etc.
  const duration = 1500;  // Duração da animação em milissegundos
  const step = target / (duration / 16); // Quantos incrementos por frame
  let current = 0;

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      current = target;
      clearInterval(timer); // Para a animação quando chegar ao final
    }

    element.textContent = Math.floor(current) + suffix;
  }, 16); // ~60fps
}

// Observa os números e anima quando aparecem na tela
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted'); // Evita animar mais de uma vez
        animateCounter(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

// Aplica só nos elementos que têm data-target
document.querySelectorAll('.stat-num[data-target]').forEach((el) => {
  counterObserver.observe(el);
});


/* ─────────────────────────────────────────────────
   4. LINK ATIVO NO MENU (Active Section Highlight)

   📌 O QUE FAZ:
   Detecta em qual seção o usuário está e poderia
   destacar o link correspondente no menu.
   (Pronto para quando você adicionar links na navbar)
───────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      // Seção ativa — você pode usar isso para destacar links de menu
      // document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add('active');
    }
  });
});


/* ─────────────────────────────────────────────────
   5. PARTÍCULAS SUAVES NO HERO (Opcional)

   📌 O QUE FAZ:
   Cria bolinhas animadas sutis no fundo do hero,
   reforçando o clima tecnológico.
   Para ATIVAR: descomente o código abaixo
   Para DESATIVAR: deixe comentado
───────────────────────────────────────────────── */

/*
function createParticles() {
  const hero = document.getElementById('hero');
  const count = 20;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      border-radius: 50%;
      background: rgba(0, 174, 239, ${Math.random() * 0.4 + 0.1});
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
      animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    hero.appendChild(dot);
  }
}

createParticles();
*/


/* ─────────────────────────────────────────────────
   6. MENSAGEM NO CONSOLE (Marca da Syncore)
   
   📌 O QUE FAZ:
   Exibe uma mensagem personalizada no console
   do navegador (F12 > Console).
   É um toque profissional que agências de tecnologia usam.
───────────────────────────────────────────────── */
console.log('%c⚡ Syncore', 'color: #00AEEF; font-size: 20px; font-weight: bold;');
console.log('%cSincronia que constrói o futuro.', 'color: #1A56E8; font-size: 12px;');
console.log('%cDesenvolvido pela Syncore — syncore.com.br', 'color: #7A8BAF; font-size: 11px;');
