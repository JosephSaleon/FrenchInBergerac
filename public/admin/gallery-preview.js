// Aperçu de la fiche « La maison — galerie » dans l'admin : l'agencement de la grille,
// sur ordinateur (3 colonnes) et sur téléphone (2 colonnes), avec les cases restées vides.
// Placement calqué sur la grille du site (.gallery dans src/styles/global.css, grid-auto-flow: dense).
(() => {
  const { CMS, h, createClass } = window;
  if (!CMS) return;

  const SPANS = { normal: [1, 1], wide: [2, 1], tall: [1, 2], big: [2, 2] };
  const SIZE_LABELS = { normal: 'normale', wide: 'large', tall: 'haute', big: 'grande' };

  // Même règle que CSS en mode dense : chaque photo prend la première place libre où elle tient
  const place = (photos, cols) => {
    const used = [];
    const free = (r, c, w, hgt) => {
      for (let y = r; y < r + hgt; y++) for (let x = c; x < c + w; x++) if (used[y]?.[x]) return false;
      return true;
    };
    const items = photos.map((p, i) => {
      const [sw, sh] = SPANS[p.size] ?? SPANS.normal;
      const w = Math.min(sw, cols);
      for (let r = 0; ; r++) {
        for (let c = 0; c + w <= cols; c++) {
          if (free(r, c, w, sh)) {
            for (let y = r; y < r + sh; y++) for (let x = c; x < c + w; x++) (used[y] ??= [])[x] = true;
            return { ...p, n: i + 1, r, c, w, h: sh };
          }
        }
      }
    });
    const rows = used.length;
    const holes = [];
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (!used[y]?.[x]) holes.push({ r: y, c: x });
    return { items, holes, rows };
  };

  const imageUrl = (getAsset, path) => {
    if (!path) return '';
    try {
      const url = String(getAsset(path) ?? '');
      // un chemin /src/assets/… n'est pas servi tel quel : seules les adresses d'aperçu s'affichent
      return /^(blob:|https?:|data:)/.test(url) ? url : '';
    } catch {
      return '';
    }
  };

  const grid = (title, cols, rowHeight, photos, getAsset) => {
    const { items, holes } = place(photos, cols);
    const cell = (r, c, w, hgt) => ({ gridRow: `${r + 1} / span ${hgt}`, gridColumn: `${c + 1} / span ${w}` });
    return h(
      'section',
      { style: { marginBottom: '28px' } },
      h('h3', { style: { font: '600 13px system-ui, sans-serif', margin: '0 0 8px', color: '#555' } }, title),
      h(
        'div',
        {
          style: {
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridAutoRows: `${rowHeight}px`,
            gap: '6px',
            maxWidth: cols === 3 ? '420px' : '220px',
          },
        },
        ...items.map((p) => {
          const url = imageUrl(getAsset, p.image);
          return h(
            'div',
            {
              key: `p${p.n}`,
              style: {
                ...cell(p.r, p.c, p.w, p.h),
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '6px',
                background: '#d9e2dc',
                font: '12px/1.3 system-ui, sans-serif',
                color: '#1d2a24',
              },
            },
            url &&
              h('img', {
                src: url,
                alt: '',
                style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.focus || 'center', opacity: 0.8 },
              }),
            h(
              'div',
              {
                style: {
                  position: 'absolute',
                  insetInline: '4px auto',
                  top: '4px',
                  maxWidth: 'calc(100% - 8px)',
                  padding: '3px 6px',
                  borderRadius: '4px',
                  background: 'rgb(255 255 255 / 0.88)',
                },
              },
              h('strong', null, `${p.n}. `),
              p.captionFr || 'sans légende',
              h('div', { style: { opacity: 0.7 } }, SIZE_LABELS[p.size] ?? 'normale'),
            ),
          );
        }),
        ...holes.map((x) =>
          h('div', {
            key: `v${x.r}-${x.c}`,
            title: 'Case vide',
            style: { ...cell(x.r, x.c, 1, 1), border: '2px dashed #c0392b', borderRadius: '6px', background: 'rgb(192 57 43 / 0.06)' },
          }),
        ),
      ),
      holes.length > 0 &&
        h(
          'p',
          { style: { font: '12px system-ui, sans-serif', color: '#c0392b', margin: '6px 0 0' } },
          `${holes.length} case${holes.length > 1 ? 's' : ''} vide${holes.length > 1 ? 's' : ''} (en pointillés) : changer une taille ou l’ordre des photos pour ${holes.length > 1 ? 'les' : 'la'} combler.`,
        ),
    );
  };

  const GalleryPreview = createClass({
    render() {
      const { entry, getAsset } = this.props;
      const list = entry.getIn(['data', 'photos']);
      const photos = (list?.toJS ? list.toJS() : list) ?? [];
      return h(
        'div',
        { style: { padding: '8px 4px' } },
        h('p', { style: { font: '12px system-ui, sans-serif', color: '#555', margin: '0 0 16px' } }, 'Agencement de la grille (les numéros suivent l’ordre de la liste).'),
        grid('Ordinateur', 3, 70, photos, getAsset),
        grid('Téléphone', 2, 55, photos, getAsset),
      );
    },
  });

  CMS.registerPreviewTemplate('house-gallery', GalleryPreview);
})();
