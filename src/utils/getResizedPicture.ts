export function getResizedPicture(imageurl: string) {
  const parsedURl = new URL(imageurl);
  let pathname = parsedURl.pathname;
  pathname = pathname.replace("/100x100bb.jpg", "/1000x1000bb.jpg");
  const modifiedURL: string = `${parsedURl.origin}${pathname}`;
  return modifiedURL;
}
