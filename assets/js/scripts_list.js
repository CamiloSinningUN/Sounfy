// get value past in url
    const urlParams = new URLSearchParams(window.location.search);
    const listName = urlParams.get('list');
    console.log(listName);