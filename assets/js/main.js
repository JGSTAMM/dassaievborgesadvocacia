/**
 * DASSAIEV BORGES ADVOCACIA — INTERACTIVE CONVERSION & UX SCRIPTS
 * Desenvolvido com excelência por Pixirica Tecnologias
 */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '5551999136864';

  // 1. Menu Mobile Acessível
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      mainNav.classList.toggle('is-open', !isExpanded);
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
        menuToggle.focus();
      }
    });
  }

  // 2. Triagem Inteligente para WhatsApp (100% Conversão)
  const triageForm = document.getElementById('triageForm');
  const areaSelect = document.getElementById('triageArea');

  // Pré-selecionar área ao clicar em gatilhos rápidos
  document.querySelectorAll('[data-select-area]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const targetArea = trigger.getAttribute('data-select-area');
      if (areaSelect && targetArea) {
        areaSelect.value = targetArea;
      }
    });
  });

  if (triageForm) {
    triageForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const nomeInput = document.getElementById('triageName');
      const areaInput = document.getElementById('triageArea');
      const modalidadeInput = document.getElementById('triageModality');
      const urgenciaInput = document.getElementById('triageUrgency');
      const resumoInput = document.getElementById('triageSummary');

      const nome = nomeInput && nomeInput.value.trim() ? nomeInput.value.trim() : 'Cliente pelo Site';
      const area = areaInput ? areaInput.value : 'Consultoria Jurídica Geral';
      const modalidade = modalidadeInput ? modalidadeInput.value : 'Online ou Presencial em Torres/RS';
      const urgencia = urgenciaInput ? urgenciaInput.value : 'Preciso de orientação inicial';
      const resumo = resumoInput && resumoInput.value.trim() ? resumoInput.value.trim() : 'Gostaria de agendar uma análise do meu caso.';

      const messageLines = [
        'Olá, Dr. Dassaiev Borges! Vim pelo site oficial e gostaria de atendimento jurídico.',
        '',
        '*Nome:* ' + nome,
        '*Área de Interesse:* ' + area,
        '*Modalidade Preferida:* ' + modalidade,
        '*Situação / Urgência:* ' + urgencia,
        '*Resumo do Caso:* ' + resumo
      ];

      const whatsappUrl =
        'https://wa.me/' +
        WHATSAPP_NUMBER +
        '?text=' +
        encodeURIComponent(messageLines.join('\n'));

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // 3. Atualização automática de ano no rodapé
  document.querySelectorAll('[data-current-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // 4. Efeitos 3D Interativos: Parallax com Luz Especular (Desktop) & Ambiente Tátil (Mobile)
  (function init3DEffects() {
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 768);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    if (isTouchDevice) {
      document.body.classList.add('is-mobile-3d');
      return;
    }

    const tiltElements = document.querySelectorAll(
      '.area-card, .pillar-box, .review-card, .triage-form, .about-photo-sub, .bio-card-header, .bio-link-btn'
    );

    tiltElements.forEach(function (card) {
      let ticking = false;

      card.addEventListener('mousemove', function (e) {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Inclinação 3D proporcional suave (-6deg a +6deg)
            const rotateX = ((centerY - y) / centerY) * 6;
            const rotateY = ((x - centerX) / centerX) * 6;

            // Ponto de luz especular radial (0% a 100%)
            const spotX = (x / rect.width) * 100;
            const spotY = (y / rect.height) * 100;

            card.style.setProperty('--rot-x', rotateX.toFixed(2) + 'deg');
            card.style.setProperty('--rot-y', rotateY.toFixed(2) + 'deg');
            card.style.setProperty('--spot-x', spotX.toFixed(1) + '%');
            card.style.setProperty('--spot-y', spotY.toFixed(1) + '%');

            ticking = false;
          });
          ticking = true;
        }
      });

      card.addEventListener('mouseleave', function () {
        card.style.setProperty('--rot-x', '0deg');
        card.style.setProperty('--rot-y', '0deg');
        card.style.setProperty('--spot-x', '50%');
        card.style.setProperty('--spot-y', '50%');
      });
    });
  })();
})();
