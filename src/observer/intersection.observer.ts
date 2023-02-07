const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('popover.state | The element has entered the viewport|');
    } else {
      console.log('popover.state | The element has left the viewport|');
    }
  });
});


// user for obtimize image