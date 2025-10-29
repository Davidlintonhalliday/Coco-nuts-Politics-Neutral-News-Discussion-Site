/* CONFIG: update these to your channels */
const GITHUB_USER = "DavidLinton-Halliday"; // your GitHub username
const REPO_NAME = "coconuts-politics"; // your repository for this site
const DISCUSS_URL = `https://github.com/${GITHUB_USER}/${REPO_NAME}/discussions`;
const ISSUES_NEW = `https://github.com/${GITHUB_USER}/${REPO_NAME}/issues/new`;


const YOUTUBE_PLAYLIST_ID = "PLxxxxxxxxxxxxxxxx"; // paste your playlist ID
const PODCAST_RSS = "https://example.com/podcast.rss"; // paste your RSS (optional)


/* ---------- nav toggle ---------- */
document.addEventListener('DOMContentLoaded', () => {
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();


const toggle = document.querySelector('.nav-toggle');
const list = document.getElementById('nav-list');
if (toggle && list){
toggle.addEventListener('click', () => {
const exp = list.getAttribute('aria-expanded') === 'true';
list.setAttribute('aria-expanded', String(!exp));
toggle.setAttribute('aria-expanded', String(!exp));
});
}


/* community links */
const discuss = document.getElementById('discuss-link');
if (discuss) discuss.href = DISCUSS_URL;


/* create issue with form data */
const submitTip = document.getElementById('submit-tip');
if (submitTip){
submitTip.addEventListener('submit', (e) => {
e.preventDefault();
const fd = new FormData(submitTip);
const title = encodeURIComponent(fd.get('title'));
const url = encodeURIComponent(fd.get('url'));
const note = encodeURIComponent(fd.get('note'));
const body = encodeURIComponent(`**Link:** ${fd.get('url')}
\n**Why it matters:**\n${fd.get('note')}`);
const target = `${ISSUES_NEW}?title=${title}&body=${body}&labels=newslink`;
window.open(target, '_blank', 'noopener');
});
}


/* load curated sources */
fetch('data/sources.json')
.then(r => r.json())
.then(data => renderSources(data))
.catch(() => console.warn('Add data/sources.json to populate cards.'));


/* init polls */
initPolls();


/* embed YouTube playlist if provided */
if (YOUTUBE_PLAYLIST_ID && YOUTUBE_PLAYLIST_ID !== 'PLxxxxxxxxxxxxxxxx'){
const el = document.getElementById('yt-embed');
if (el){
el.innerHTML = `<iframe src="https://www.youtube.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}" title="YouTube playlist" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}
} else {
const el = document.getElementById('yt-embed');
