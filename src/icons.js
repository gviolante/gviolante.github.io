/** Ícones vetoriais locais, decorativos: o nome acessível fica no texto do controle. */
const paths = {
  github: '<path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.5-3.7A4.9 4.9 0 0 0 18.7.5S17.5.2 15 1.9a13.4 13.4 0 0 0-7 0C5.5.2 4.3.5 4.3.5a4.9 4.9 0 0 0-.1 3.7 5.3 5.3 0 0 0-1.5 3.7c0 5.3 3.2 6.5 6.2 6.8A3.4 3.4 0 0 0 8 17.4v3.9" transform="translate(1 1) scale(.94)"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m4 0v-7m0 3a3 3 0 0 1 6 0v4"/><circle cx="7" cy="7" r=".7" fill="currentColor"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  document: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5"/>',
  graduation: '<path d="m2 9 10-5 10 5-10 5zM6 11v6c4 3 8 3 12 0v-6M22 9v7"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16"/>',
  network: '<circle cx="12" cy="12" r="3"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="m6 6 4 4m4 4 4 4m0-12-4 4m-4 4-4 4"/>',
  layers: '<path d="m3 7 9-5 9 5-9 5zM3 12l9 5 9-5M3 17l9 5 9-5"/>',
  terminal: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 8 4 4-4 4m8 0h4"/>',
  tools: '<path d="m14 6 4 4 3-3a6 6 0 0 1-8 7L6 21a2 2 0 0 1-3-3l7-7a6 6 0 0 1 7-8z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/>',
};
export function icon(name) {
  if (!paths[name]) throw new Error(`Ícone desconhecido: ${name}`);
  return `<svg class="icon icon-${name}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
}
