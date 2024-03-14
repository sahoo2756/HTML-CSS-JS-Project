const tl = gsap.timeline();

tl.from("#nav img , #nav-mid h4 , #nav-last h4  , button" , {
    y:-100,
    opacity:0,
    delay:.5,
    duration:.4,
    stagger : 0.3

});

tl.from("#main h4" , {
    y:100,
    opacity:0,
    stagger:0.5
});

tl.from("#main img" , {
    scale:0,
    opacity:0
});

tl.from("body h2" , {
    opacity:0,
    scale:1
}); 

tl.to("body h2" , {
    y:25,
    duration:0.5,
    repeat : -1,
    yoyo:true
});
