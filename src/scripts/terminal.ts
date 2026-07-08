/**
 * Interactive site terminal. Opens via [data-terminal-open] or the
 * backtick key; Esc closes. All factual output comes from the JSON data
 * island rendered from consts.ts (SSOT) — flavor commands are clearly
 * jokes and never fake claims.
 */

import { toggleEdition } from './theme';

type TermProject = {
  slug: string;
  name: string;
  category: string;
  status: string;
  year: string;
  tagline: string;
  url?: string;
};

type TermData = {
  person: {
    name: string;
    role: string;
    github: string;
    location: string;
    tagline: string;
  };
  projects: TermProject[];
  disciplines: string[];
  site: string;
};

export function initTerminal() {
  const root = document.getElementById('site-terminal');
  const dataEl = document.getElementById('terminal-data');
  if (!root || !dataEl) return;
  const data: TermData = JSON.parse(dataEl.textContent || '{}');
  const screen = root.querySelector<HTMLElement>('[data-terminal-screen]');
  const input = root.querySelector<HTMLInputElement>('[data-terminal-input]');
  const form = root.querySelector<HTMLFormElement>('[data-terminal-form]');
  if (!screen || !input || !form) return;

  let lastFocus: Element | null = null;
  let booted = false;
  const history: string[] = [];
  let historyIdx = -1;

  const print = (text = '', cls = '') => {
    const line = document.createElement('div');
    line.className = cls ? `term__line ${cls}` : 'term__line';
    line.textContent = text;
    screen.appendChild(line);
    screen.scrollTop = screen.scrollHeight;
  };

  const boot = () => {
    print(`${data.person.name.toUpperCase()} — PORTFOLIO TTY`, 'term__line--head');
    print(data.person.tagline, 'term__line--dim');
    print('');
    print(`type 'help' for commands.`, 'term__line--dim');
  };

  const open = () => {
    lastFocus = document.activeElement;
    root.hidden = false;
    requestAnimationFrame(() => root.classList.add('term--open'));
    if (!booted) {
      booted = true;
      boot();
    }
    setTimeout(() => input.focus(), 60);
  };

  const close = () => {
    root.classList.remove('term--open');
    setTimeout(() => {
      root.hidden = true;
    }, 350);
    if (lastFocus instanceof HTMLElement) lastFocus.focus();
  };

  const findProject = (key: string) =>
    data.projects.find(
      (p) => p.slug === key || p.name.toLowerCase() === key.toLowerCase(),
    );

  const listProjects = () => {
    const pad = Math.max(...data.projects.map((p) => p.slug.length)) + 2;
    data.projects.forEach((p) => {
      print(`${p.slug.padEnd(pad)}${p.name} — ${p.status} (${p.year})`);
    });
    print('');
    print(`open <slug> for the story · visit <slug> for the live site`, 'term__line--dim');
  };

  const commands: Record<string, { desc: string; run: (args: string[]) => void }> = {
    help: {
      desc: 'list available commands',
      run: () => {
        Object.entries(commands).forEach(([name, c]) => {
          print(`${name.padEnd(10)}${c.desc}`);
        });
      },
    },
    about: {
      desc: 'who is Eric Malamisura',
      run: () => {
        print(`${data.person.name} — ${data.person.role}.`);
        print(data.person.tagline);
        print(`location: ${data.person.location}`);
      },
    },
    work: {
      desc: 'list the projects',
      run: listProjects,
    },
    ls: {
      desc: "alias for 'work'",
      run: listProjects,
    },
    open: {
      desc: 'open <slug> — read a project story',
      run: (args) => {
        const key = args[0];
        if (!key) {
          print('usage: open <slug>', 'term__line--err');
          return;
        }
        if (key === 'github') {
          window.open(data.person.github, '_blank', 'noopener');
          print(`→ ${data.person.github}`);
          return;
        }
        const p = findProject(key);
        if (!p) {
          print(`no such project: ${key} — try 'work'`, 'term__line--err');
          return;
        }
        print(`→ ${data.site}/work/${p.slug}`);
        window.location.href = `/work/${p.slug}`;
      },
    },
    visit: {
      desc: 'visit <slug> — jump to the live product',
      run: (args) => {
        const p = args[0] ? findProject(args[0]) : undefined;
        if (!p || !p.url) {
          print(`usage: visit <slug> — try 'work' for slugs`, 'term__line--err');
          return;
        }
        window.open(p.url, '_blank', 'noopener');
        print(`→ ${p.url}`);
      },
    },
    contact: {
      desc: 'how to reach Eric',
      run: () => {
        print(`letters: ${data.site}/contact`);
        print(`github:  ${data.person.github}`);
        print('');
        print(`type 'write' to open the letters desk`, 'term__line--dim');
      },
    },
    write: {
      desc: 'open the letters-to-the-editor form',
      run: () => {
        print(`→ ${data.site}/contact`);
        window.location.href = '/contact';
      },
    },
    theme: {
      desc: 'toggle the Night Edition',
      run: () => {
        const edition = toggleEdition();
        print(`edition set: ${edition}`);
      },
    },
    whoami: {
      desc: 'who are you?',
      run: () => print('guest — a reader of the work of Eric Malamisura.'),
    },
    ori: {
      desc: 'about the OriLang language',
      run: () => {
        const p = findProject('ori-lang');
        if (!p) return;
        print(`${p.name} — ${p.category}`);
        print(p.tagline);
        if (p.url) print(`→ ${p.url}`);
      },
    },
    clear: {
      desc: 'clear the screen',
      run: () => {
        screen.innerHTML = '';
      },
    },
    exit: {
      desc: 'close the terminal',
      run: close,
    },
    sudo: {
      desc: 'attempt privilege escalation',
      run: (args) => {
        if (args.join(' ').toLowerCase().includes('hire')) {
          print('privilege granted. drafting the offer letter…');
          print(`→ ${data.site}/contact`);
        } else {
          print(`guest is not in the sudoers file. this incident will be printed.`, 'term__line--err');
        }
      },
    },
  };

  const run = (raw: string) => {
    const line = raw.trim();
    if (!line) return;
    history.push(line);
    historyIdx = history.length;
    print(`$ ${line}`, 'term__line--cmd');
    const [name, ...args] = line.split(/\s+/);
    const cmd = commands[name.toLowerCase()];
    if (cmd) {
      cmd.run(args);
    } else {
      print(`command not found: ${name} — try 'help'`, 'term__line--err');
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    run(input.value);
    input.value = '';
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx > 0) input.value = history[--historyIdx] ?? '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        input.value = history[++historyIdx] ?? '';
      } else {
        historyIdx = history.length;
        input.value = '';
      }
    }
  });

  document.querySelectorAll('[data-terminal-open]').forEach((btn) => {
    btn.addEventListener('click', open);
  });
  root.querySelectorAll('[data-terminal-close]').forEach((btn) => {
    btn.addEventListener('click', close);
  });
  root.addEventListener('click', (e) => {
    if (e.target === root) close();
  });

  window.addEventListener('keydown', (e) => {
    const target = e.target as HTMLElement;
    const typing =
      target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
    if (e.key === '`' && !typing) {
      e.preventDefault();
      root.hidden ? open() : close();
    } else if (e.key === 'Escape' && !root.hidden) {
      close();
    }
  });
}
