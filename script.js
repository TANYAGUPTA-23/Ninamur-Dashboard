

document.addEventListener("DOMContentLoaded", () => {
  const tabItems = document.querySelector(".order-tab:nth-child(1)");
  const tabExtras = document.querySelector(".order-tab:nth-child(2)");
  const tableWrapper = document.querySelector(".order-table-wrapper");
  const orderBody = document.querySelector(".order-body");

  // Initial state
  tableWrapper.style.display = "block";
  orderBody.style.display = "none";

  tabItems.addEventListener("click", () => {
    tabItems.classList.add("order-tab-active");
    tabItems.classList.remove("order-tab-inactive");
    tabExtras.classList.remove("order-tab-active");
    tabExtras.classList.add("order-tab-inactive");

    tableWrapper.style.display = "block";
    orderBody.style.display = "none";
  });

  tabExtras.addEventListener("click", () => {
    tabExtras.classList.add("order-tab-active");
    tabExtras.classList.remove("order-tab-inactive");
    tabItems.classList.remove("order-tab-active");
    tabItems.classList.add("order-tab-inactive");

    tableWrapper.style.display = "none";
    orderBody.style.display = "block";
  });
});


// Chat Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatPopup = document.getElementById('chatPopupOverlay');
    const closeBtn = document.getElementById('closeButton');
    const body = document.body;

    // Function to disable scroll
    function disableScroll() {
        body.style.overflow = 'hidden';
        body.style.height = '100%';
    }

    // Function to enable scroll
    function enableScroll() {
        body.style.overflow = '';
        body.style.height = '';
    }

    // Function to open chat
    function openChat() {
        chatPopup.style.display = 'flex';
        disableScroll();
    }

    // Function to close chat
    function closeChat() {
        chatPopup.style.display = 'none';
        enableScroll();
    }

    // Add click handler to all chat boxes
    document.querySelectorAll('.chat-box').forEach(chatBox => {
        chatBox.addEventListener('click', openChat);
    });

    // Close when clicking the close button
    closeBtn.addEventListener('click', closeChat);

    // Close when clicking outside the chat container
    chatPopup.addEventListener('click', function(e) {
        if (e.target === chatPopup) {
            closeChat();
        }
    });

    // Close when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && chatPopup.style.display === 'flex') {
            closeChat();
        }
    });
});



(function () {
  const select = document.getElementById('category');
  const table = document.querySelector('.order-table');
  if (!select || !table) return;

  const headerRow = table.querySelector('thead tr');

  // SVG to place in middle rows
  const incidentSVG = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3720_2890)">
<path d="M13.7881 10.9253L8.3534 1.51209C8.07091 1.0228 7.56494 0.730713 6.99999 0.730713C6.43504 0.730713 5.92907 1.02283 5.64658 1.51209L0.211867 10.9253C-0.0706222 11.4146 -0.0706222 11.9988 0.211867 12.4881C0.494355 12.9773 1.0003 13.2695 1.56528 13.2695H12.4347C12.9997 13.2695 13.5057 12.9773 13.7881 12.4881C14.0706 11.9988 14.0706 11.4146 13.7881 10.9253ZM13.0772 12.0776C12.9431 12.3099 12.7029 12.4485 12.4347 12.4485H1.56528C1.29709 12.4485 1.0569 12.3099 0.922806 12.0776C0.788712 11.8453 0.788712 11.568 0.922806 11.3357L6.35752 1.92252C6.49164 1.69026 6.7318 1.5516 6.99999 1.5516C7.26818 1.5516 7.50837 1.69026 7.64246 1.92252L13.0772 11.3357C13.2113 11.568 13.2113 11.8453 13.0772 12.0776Z" fill="#D60000"/>
<path d="M6.99992 9.71191C6.69816 9.71191 6.45264 9.95743 6.45264 10.2592C6.45264 10.561 6.69816 10.8065 6.99992 10.8065C7.30169 10.8065 7.54721 10.561 7.54721 10.2592C7.54721 9.95743 7.30169 9.71191 6.99992 9.71191Z" fill="#D60000"/>
<path d="M7.41027 4.64966H6.58936V8.89109H7.41027V4.64966Z" fill="#D60000"/>
</g>
<defs>
<clipPath id="clip0_3720_2890">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>
`.trim();

  function getIncidentHeaderIndex() {
    const ths = Array.from(headerRow.children);
    return ths.findIndex(th => th.classList.contains('order-col-incident') || th.classList.contains('incident-col'));
  }

  // Ensure every row has a .incident-col <td> at the correct index
  function ensureIncidentCellsPresent() {
    const idx = getIncidentHeaderIndex();
    if (idx === -1) return; // you already added the th, but check

    const rows = Array.from(table.querySelectorAll('tbody tr'));
    rows.forEach(row => {
      // if there is already a cell with .incident-col, skip inserting
      if (row.querySelector('td.incident-col')) return;

      const td = document.createElement('td');
      td.className = 'incident-col order-col-incident order-text-center';
      td.setAttribute('aria-hidden', 'true'); // initially hidden
      // Insert at proper position; if row has fewer cells, append
      const cells = row.children;
      if (idx >= cells.length) row.appendChild(td);
      else row.insertBefore(td, cells[idx]);
    });
  }

  // Populate content: first and last => '-', middle three => SVG (best-effort)
  function populateIncidentContents() {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const n = rows.length;
    if (n === 0) return;

    // compute start/end for three centered rows (avoid first and last)
    let start = Math.floor((n - 3) / 2);
    if (start < 1) start = 1;
    let end = start + 2;
    if (end > n - 2) {
      end = Math.max(1, n - 2);
      start = Math.max(1, end - 2);
    }

    rows.forEach((row, i) => {
      let td = row.querySelector('td.incident-col');
      // if somehow still missing, create (defensive)
      if (!td) {
        td = document.createElement('td');
        td.className = 'incident-col order-col-incident order-text-center';
        row.appendChild(td);
      }
      // If cell already has content left intentionally by you, preserve it.
      const hasContent = td.innerHTML.trim().length > 0 && td.innerHTML.trim() !== '&nbsp;';
      if (hasContent) {
        // keep existing content
        return;
      }

      // auto-fill according to rules
      if (n === 1) {
        td.textContent = '-';
      } else if (i === 0 || i === n - 1) {
        td.textContent = '-';
      }else if (i >= start && i <= end) {
  // wrap SVG in span with data-target
  const wrapper = document.createElement('span');
  wrapper.innerHTML = incidentSVG;
  wrapper.className = 'js-incident-svg';

  // assign data-target for modal
  if (i === start || i === start + 1) {
    wrapper.dataset.target = '#incidentModal';   // first two SVGs
  } else if (i === end) {
    wrapper.dataset.target = '#incidentModal2';  // third SVG
  }

  td.innerHTML = '';
  td.appendChild(wrapper);
}
else {
        td.textContent = '-';
      }
    });
  }

  function setIncidentVisible(show) {
    if (show) {
      table.classList.add('show-incident');
    } else {
      table.classList.remove('show-incident');
    }

    // accessibility: toggle aria-hidden on cells
    const incidentCells = table.querySelectorAll('.incident-col, th.incident-col, th.order-col-incident');
    incidentCells.forEach(node => {
      if (show) node.removeAttribute('aria-hidden');
      else node.setAttribute('aria-hidden', 'true');
    });
  }

  function handleChange() {
    const v = (select.value || '').trim().toUpperCase();
    const show = v === 'INCIDENT';
    if (show) {
      // make sure cells exist and are populated before showing
      ensureIncidentCellsPresent();
      populateIncidentContents();
    }
    setIncidentVisible(show);
  }

  select.addEventListener('change', handleChange);

  // initial sync on load
  handleChange();

  // expose helper for manual sync (useful if rows change dynamically)
  window._orderTable = window._orderTable || {};
  window._orderTable.syncIncident = function () {
    ensureIncidentCellsPresent();
    populateIncidentContents();
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('incidentModal');
  const closeBtn = document.getElementById('closeIncidentBtn');
  const table = document.querySelector('.order-table');

  function openModal() {
    if (!modal) {
      console.error('Incident modal not found (#incidentModal). Add modal HTML to the page.');
      return;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
    console.log('Incident modal opened');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    console.log('Incident modal closed');
  }

  if (!table) {
    console.error('Order table not found (.order-table).');
    return;
  }

  // Use event delegation: listen for clicks on svg inside an .incident-col cell
  table.addEventListener('click', (e) => {
    // find the closest svg element that was clicked (or a parent of the clicked node)
    const clickedSvg = e.target.closest && e.target.closest('svg');

    if (!clickedSvg) {
      // not an svg click — ignore
      return;
    }

    // ensure this svg is inside an incident cell (td or th)
    const inIncidentCell = clickedSvg.closest && clickedSvg.closest('.incident-col, .order-col-incident');

    if (!inIncidentCell) {
      // clicked an svg elsewhere in the table — ignore
      return;
    }

    // Optional: only respond for the FIRST svg in the column
    // Uncomment the next block if you want only the first-row svg to open the modal
    /*
    const allIncidentSvgs = Array.from(table.querySelectorAll('.incident-col svg, th.order-col-incident svg'));
    if (allIncidentSvgs.length && clickedSvg !== allIncidentSvgs[0]) {
      console.log('Clicked incident svg is not the first one; ignoring (first-only mode).');
      return;
    }
    */

    // At this point, a svg inside the incident column was clicked -> open modal
    const wrapper = clickedSvg.closest('.js-incident-svg');
if (!wrapper) return;

const targetSelector = wrapper.dataset.target;
if (!targetSelector) return;

const modalToOpen = document.querySelector(targetSelector);
if (!modalToOpen) return;

modalToOpen.classList.add('active');
document.body.style.overflow = 'hidden';

  });

  // Close handlers
  // handle close for all modals
document.querySelectorAll('.incident-close').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const modal = e.target.closest('.incident-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    console.log('Modal closed via close button');
  });
});

  // Close when clicking the overlay area
document.querySelectorAll('.incident-modal').forEach(modal => {
  modal.addEventListener('click', (ev) => {
    if (ev.target.classList && ev.target.classList.contains('incident-overlay')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      console.log('Modal closed via overlay');
    }
  });
});


  // Optional keyboard close (Esc)
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  console.log('Incident SVG click handler attached.');
});

document.addEventListener('DOMContentLoaded', () => {
  // Select all modals
  const modals = document.querySelectorAll('.incident-modal');

  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.incident-close');
    const commercialCheckbox = modal.querySelector('input[type="checkbox"]#commercial');
    const typeSelect = modal.querySelector('.custom-select-dropdown');

    if (!closeBtn || !commercialCheckbox || !typeSelect) return;

    const checkboxContainer = commercialCheckbox.parentElement;

    // Initially hide Commercial Courtesy
    checkboxContainer.style.display = 'none';

    // Close modal
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', closeModal);
    modal.querySelector('.incident-overlay').addEventListener('click', closeModal);
    document.addEventListener('keydown', ev => {
      if (ev.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // Function to update checkbox visibility
    const updateCheckboxVisibility = () => {
      const value = typeSelect.options[typeSelect.selectedIndex]?.text.toUpperCase().trim();
      if (value === 'NO WARRENTY') {
        checkboxContainer.style.display = 'flex';
      } else {
        checkboxContainer.style.display = 'none';
        commercialCheckbox.checked = false;
        updateTableDiscount(0);
      }
    };

    // Function to update discount in the table
    const updateTableDiscount = (discount) => {
      // You can modify this selector if you want to target a specific row
      const discountCells = document.querySelectorAll('.order-discount-text');
      discountCells.forEach(cell => cell.textContent = discount + '%');
    };

    // Checkbox change event
    commercialCheckbox.addEventListener('change', () => {
      const discount = commercialCheckbox.checked ? 100 : 0;
      updateTableDiscount(discount);
    });

    typeSelect.addEventListener('change', updateCheckboxVisibility);

    updateCheckboxVisibility(); // initial check
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Select all commercial courtesy checkboxes in all modals
  const commercialCheckboxes = document.querySelectorAll('.incident-modal input[type="checkbox"]#commercial');
  
  commercialCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const discountCell = document.querySelector('.order-discount-text'); // your table cell
      if (checkbox.checked) {
        discountCell.textContent = '100%';
      } else {
        discountCell.textContent = '0%';
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const openBtns = document.querySelectorAll('.order-preview-cell'); // NodeList of all cells
    const modal = document.querySelector('.product-modal');
    const closeBtn = modal.querySelector('.modal-close-btn');
    const backdrop = modal.querySelector('.modal-backdrop');

    // Open modal for each button
    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal on close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal on backdrop click
    backdrop.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});




document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.payment-block, .payment-container');

  blocks.forEach((block, idx) => {
    if (!block.dataset.pbId) block.dataset.pbId = String(idx + 1);

    const trigger = block.querySelector(
      '.payment-block__trigger, .payment-portal-link, .track-path-link, .action-link, .payment-block__trigger-label'
    );
    const card = block.querySelector('.payment-block__card, .payment-action-card');
    const title = block.closest('.panel-title-bar.od-card__title');

    if (!trigger || !card) return;

    // store original parent for restore later
    const originalParent = card.parentNode;
    const originalNextSibling = card.nextSibling;

    // helper to save/restore inline styles we modify
    function saveInlineStyles(el) {
      const props = ['position','left','right','top','bottom','zIndex','visibility','maxWidth','transformOrigin','width'];
      const saved = {};
      props.forEach(p => saved[p] = el.style[p] || '');
      return saved;
    }
    function restoreInlineStyles(el, saved) {
      Object.keys(saved).forEach(k => el.style[k] = saved[k]);
    }

    // open: move card to body, measure & position, then reveal
    function openCard() {
      // save current inline styles to restore later
      card._savedStyles = saveInlineStyles(card);

      // move to body
      document.body.appendChild(card);

      // ensure it's absolutely positioned and invisible for measuring
      card.style.position = 'absolute';
      card.style.zIndex = '2147483647'; // max safe
      card.style.visibility = 'hidden';
      card.classList.add('is-visible');
      card.setAttribute('aria-hidden', 'false');

      // next frame: measure and position, then reveal
      requestAnimationFrame(() => {
        positionCard(card, trigger, title);
        // reveal
        card.style.visibility = '';
      });
    }

    // close: restore original parent and inline styles
    function closeCard() {
      card.classList.remove('is-visible');
      card.setAttribute('aria-hidden', 'true');

      // restore into original place after a tick (so any click handlers run)
      requestAnimationFrame(() => {
        // restore inline styles
        if (card._savedStyles) restoreInlineStyles(card, card._savedStyles);

        // put back into original parent at original position
        if (originalNextSibling) originalParent.insertBefore(card, originalNextSibling);
        else originalParent.appendChild(card);

        delete card._savedStyles;
      });
    }

    // toggle
    function toggleHandler(e) {
      e.preventDefault();
      e.stopPropagation();
      if (card.classList.contains('is-visible')) closeCard();
      else openCard();
    }

    // compute and set absolute position (card is in body)
    function positionCard(cardEl, triggerEl, titleEl) {
      // reset possible left/right/top/bottom
      cardEl.style.left = '';
      cardEl.style.right = '';
      cardEl.style.top = '';
      cardEl.style.bottom = '';
      cardEl.style.maxWidth = '';
      cardEl.classList.remove('pinned-right');

      // measure trigger and title (relative to viewport)
      const trigRect = triggerEl.getBoundingClientRect();
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // natural size of card (without constraints)
      // ensure display to measure - card already is-visible but may have styles; use getBoundingClientRect
      let cardRect = cardEl.getBoundingClientRect();

      // Determine available horizontal bounds (title) or fallback to viewport
      let leftBound = 0, rightBound = viewportWidth;
      if (titleEl) {
        const titleRect = titleEl.getBoundingClientRect();
        leftBound = Math.max(0, titleRect.left);
        rightBound = Math.min(viewportWidth, titleRect.right);
      }

      // If card exceeds available width, clamp its maxWidth to available width
      const availableWidth = Math.max(120, rightBound - leftBound);
      if (cardRect.width > availableWidth) {
        cardEl.style.maxWidth = availableWidth + 'px';
        // re-measure after clamp
        cardRect = cardEl.getBoundingClientRect();
      }

      // prefer positioning the left edge aligned with trigger's left (in viewport coords)
      let left = trigRect.left;
      // ensure it doesn't overflow right bound
      if (left + cardRect.width > rightBound) {
        left = rightBound - cardRect.width;
      }
      // ensure it doesn't overflow left bound
      if (left < leftBound) left = leftBound;

      // vertical: prefer below the trigger; if not enough space, place above
      let top = trigRect.bottom + 8; // gap
      let placeAbove = false;
      if (top + cardRect.height > viewportHeight && trigRect.top > cardRect.height) {
        placeAbove = true;
      }
      if (placeAbove) {
        top = trigRect.top - cardRect.height - 8;
      }

      // apply absolute position relative to document (page)
      // account for page scroll
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      cardEl.style.left = (left + scrollX) + 'px';
      cardEl.style.top = (top + scrollY) + 'px';

      // set pinned-right class if aligned to rightBound (for animation origin)
      if (Math.abs((left + cardRect.width) - rightBound) < 1) {
        cardEl.classList.add('pinned-right');
        cardEl.style.transformOrigin = 'top right';
      } else {
        cardEl.classList.remove('pinned-right');
        cardEl.style.transformOrigin = 'top left';
      }
    }

    // event listeners
    trigger.addEventListener('click', toggleHandler);

    // clicking inside the card should not close it
    card.addEventListener('click', (ev) => ev.stopPropagation());

    // global close on outside click
    document.addEventListener('click', (ev) => {
      if (card.classList.contains('is-visible') && !card.contains(ev.target) && !trigger.contains(ev.target)) {
        closeCard();
      }
    });

    // Escape key closes
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && card.classList.contains('is-visible')) closeCard();
    });

    // reposition while visible
    window.addEventListener('resize', () => {
      if (card.classList.contains('is-visible')) positionCard(card, trigger, title);
    }, { passive: true });

    window.addEventListener('scroll', () => {
      if (card.classList.contains('is-visible')) positionCard(card, trigger, title);
    }, true);
  });
});

// Toggle dropdown
document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.custom-dropdown-toggle');
  const menu = dropdown.querySelector('.custom-dropdown-menu');

  toggle.addEventListener('click', () => {
    const isOpen = menu.style.display === 'block';
    // close all other dropdowns
    document.querySelectorAll('.custom-dropdown-menu').forEach(m => m.style.display = 'none');
    menu.style.display = isOpen ? 'none' : 'block';
  });

  // Close when clicking outside
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      menu.style.display = 'none';
    }
  });
});
