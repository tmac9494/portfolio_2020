export default (e, id) => {
  e.persist();
  const element = document.getElementById(id);
  const bottom = element.scrollHeight - element.scrollTop === element.clientHeight;
  const top = element.scrollTop === 0;
  if (element.scrollHeight === element.clientHeight) { return null; }
  if ((!bottom && !top) || (bottom && e.deltaY <= 0) || (top && e.deltaY >= 0)) e.stopPropagation();
  // if (!top || (top && e.deltaY > 0)) e.stopPropagation();
}
