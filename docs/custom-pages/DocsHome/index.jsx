import * as React from 'react';
import './DocsHome.scss';

import packageJson from '../../../package.json';

const sections = {
  "Chat": "Components for the chat experience: actions, dialogs, responses, loaders, citations, files.",
  "Containers": "Layout wrappers that group content into visual shells like cards, banners, and pills.",
  "Content": "Typography and content primitives for titles, text blocks, and text truncation.",
  "Controls": "Small interaction components for simple user actions like favoriting, feedback and copying.",
  "Data Display": "Components for presenting structured information, including responsive tables and lists.",
  "Disclosure": "Show and hide patterns and overlays, such as accordions, drawers, panels, and modals.",
  "Feedback": "UI elements that communicate progress or status, including shimmer placeholders and toasts.",
  "Input": "Form and selection controls users interact with: buttons, checkboxes, dropdowns, and more.",
  "Layout": "Grid and flex utilities that arrange components consistently across responsive views.",
  "Media": "Render visual and document media types, including images, videos, and embedded PDF files.",
  "User Interaction": "Features tied to user preferences and actions beyond forms, such as favoriting items.",
  "Utilities": "Helper functions and service layers that power components behind the scenes."
};

const icons = {
    'Chat': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="Chat">
            <path d="M20 14a6 6 0 0 1-6 6H8l-4 3v-5a6 6 0 0 1-2-4V8a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6z"/>
            <path d="M8 9h8"/>
            <path d="M8 12h6"/>
        </svg>
    ),
    'Containers': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="Containers">
            <rect x="3" y="4" width="18" height="16" rx="3"/>
            <path d="M3 9h18"/>
            <path d="M7 7h2"/>
            <path d="M11 7h2"/>
        </svg>
    ),
    'Content': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="Content">
            <path d="M6 7h12"/>
            <path d="M6 11h10"/>
            <path d="M6 15h8"/>
            <path d="M6 19h12"/>
        </svg>
    ),
    'Controls': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="Controls">
            <path d="M4 7h10"/>
            <path d="M18 7h2"/>
            <circle cx="16" cy="7" r="2"/>
            <path d="M4 17h2"/>
            <path d="M10 17h10"/>
            <circle cx="8" cy="17" r="2"/>
            <path d="M4 12h6"/>
            <path d="M14 12h6"/>
            <circle cx="12" cy="12" r="2"/>
        </svg>
    ),
    'Data Display': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"  stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="Data Display">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <path d="M3 9h18"/>
            <path d="M8 9v10"/>
            <path d="M14 9v10"/>
            <path d="M3 14h18"/>
            <rect x="14" y="14" width="7" height="5" rx="1.2"/>
        </svg>
    ),
    'Disclosure': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="Disclosure">
            <rect x="4" y="5" width="16" height="14" rx="2"/>
            <path d="M10 9l4 3-4 3z"/>
        </svg>
    ),
    'Feedback': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="Feedback">
            <path d="M12 21a9 9 0 1 1 9-9"/>
            <path d="M21 12v3"/>
            <path d="M21 19h.01"/>
            <path d="M8.5 12.5l2.2 2.2L15.8 9.6"/>
        </svg>
    ),
    'Input': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="Textbox">
            <rect x="3" y="6" width="18" height="12" rx="2"/>
            <path d="M7 10h10"/>
            <path d="M7 14h7"/>
            <path d="M12 9v6"/>
        </svg>
    ),
    'Layout': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="Layout">
            <rect x="3" y="4" width="18" height="16" rx="2"/>
            <path d="M9 4v16"/>
            <path d="M3 10h18"/>
        </svg>
    ),
    'Media': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="Media">
            <rect x="4" y="5" width="16" height="14" rx="2"/>
            <path d="M8 14l2-2 3 3 3-4 2 3"/>
            <circle cx="9" cy="9" r="1.2"/>
        </svg>
    ),
    'User Interaction': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="User Interaction">
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"/>
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>
            <path d="M18.5 7.5l1.5 1.5"/>
            <path d="M19.8 5.7l-1.3 1.3"/>
        </svg>
    ),
    'Utilities': (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00a68e" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="Utilities">
            <path d="M14.5 6.2a4.5 4.5 0 0 0-5.9 5.9l-5.1 5.1a2 2 0 1 0 2.8 2.8l5.1-5.1a4.5 4.5 0 0 0 5.9-5.9l-2.2 2.2-2.6-.6-.6-2.6z"/>
            <path d="M19 4l.6 1.6L21 6.2l-1.4.6L19 8.4l-.6-1.6L17 6.2l1.4-.6z"/>
        </svg>
    )
}

const DocsHome = () => {
    return (
        <div className="docsHome">
            <header>
                <img 
                    className="logo"
                    src="https://d1198w4twoqz7i.cloudfront.net/wp-content/uploads/2025/08/04052547/header-dark-logo.png" 
                />
                <h1>
                    <span>PixelParts</span> Component System</h1>
                <h2>PixelParts is collection of ready to use components for building McDermott applications.</h2>
            </header>
            <div className="version">
                <p>
                    <b>Current version:</b>{' '}
                    <a href="https://github.com/mwe-apps/pixel-parts/pkgs/npm/pixel-parts" target="_blank" rel="noreferrer">
                       {packageJson.version}
                    </a>
                    <div>
                        <code>npm i --save @mwe-apps/pixel-parts</code>
                    </div>
                </p>
            </div>
            <div className="cards">
                {Object.entries(sections).map(([title, description]) => (
                    <div className="card" key={title}>
                        {icons[title] && <div>{icons[title]}</div>}
                        <h3 key={title}>{title}</h3>
                        <p>{description}</p>
                    </div>
                ))}
            </div>
            <div className="contributors">
                <h3 className="sectionHeading">Contributors</h3>
                <div className="contributorList">
                    {packageJson.contributors.map((contributor, index) => (
                        <a key={index} href={contributor.email ? `mailto:${contributor.email}` : '#'}>
                            {contributor.name}
                        </a>
                    ))} 
                </div>
                
            </div>
        </div>
    );
};

export default DocsHome;