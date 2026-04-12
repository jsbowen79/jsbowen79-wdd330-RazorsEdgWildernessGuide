export function handleError(error, displayElement = null) {
  console.error("Error", error);

  const message = getUserMessage(error);

  if (displayElement) {
    displayElement.innerHTML = `<div class="error">
        <p>${message}</p>
        </div> `;
  } else {
    alert(message);
  }
}

function getUserMessage(error) {
  if (error.message?.includes("failed to fetch")) {
    return (
      "This is not the information " +
      "you were  looking for.  API information not found."
    );
  }
  if (error.message?.includes("404")) {
    return "You followed the wrong trail and ended up on the wrong page!  Error 404.";
  }

  return "The wilderness is WILD.  Our server couldn't handle it.  Please try again.";
}

export function renderError(message) {
  return `
    <div class="error">
    <p>${message}</p>
    </div>`;
}
