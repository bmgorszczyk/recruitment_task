import json from '../../menuData';
import $ from 'jquery';

const mainMenu = $("#main-menu ul");

function GenerateMegaMenu(list, menu) {
    menu.forEach(menuItem => {
        let li;
        
        if (menuItem.sub) {
            li = $(`<li class="menu-item"></li>`);
            li.append($(`<button>${menuItem.label}<span class="accordion-arrow fa fa-angle-down"></span></button>`));
            $(list).append(li);
            const subMenu = $(`<nav class="sub-menu sub-menu-${menuItem.level}"></nav>`);
            const subMenuUl = $(`<ul></ul>`);
            
            $(li).append(subMenu);
            $(subMenu).append(subMenuUl);

            if(menuItem.level == 1) {
                subMenu.append($("<button class='close-menu-btn'></button>"))
            }

            return GenerateMegaMenu($(subMenuUl), menuItem.sub);
        }
        else {
            li = $(`<li class="menu-item"></li>`);
            li.append($(`<a href="${menuItem.link}">${menuItem.label}</a>`));
            list.append(li);
        }
    });
}

GenerateMegaMenu(mainMenu, json.menu);

// =======  Handling click events on main menu buttons ========= //

$(".main-menu > ul > .menu-item > button").on("click", function() {
    $(".sub-menu-1").removeClass("active");
    $(".main-menu > ul > .menu-item > button").removeClass("active");
    $(".sub-menu-1 > ul > .menu-item > button").removeClass("active");
    $(this).addClass("active");
    $(".sub-menu-2").removeClass("active");
    $(this).next(".sub-menu-1")
        .addClass("active")
        .find(".menu-item:first-of-type > button")
        .addClass("active")
        .find(".accordion-arrow")
        .addClass("rolled")
        .closest(".menu-item:first-of-type > button")
        .next(".sub-menu-2")
        .addClass("active")
        .find(".menu-item:first-of-type .sub-menu-3")
        .css({"display": "block"})
});

// =======  Handling click events on category submenu items  ========= //

$(".sub-menu-1 > ul > .menu-item > button").on("click", function() {
    $(".sub-menu-2").removeClass("active");
    $(".sub-menu-1 > ul > .menu-item > button").removeClass("active");
    $(".sub-menu-3").removeClass("active");
    $(this).addClass("active");
    $(this).next(".sub-menu-2").addClass("active")
})

// =======  Handling click events on accordion buttons ========= //

$(".sub-menu-3").hide();

$(".sub-menu-2 > ul > .menu-item > button").on("click", function() {
    if($(this).next(".sub-menu-3").css('display') == 'none') {
        $(".sub-menu-3").slideUp();
        $(this).next(".sub-menu-3").slideDown();
        $(".accordion-arrow").removeClass("rolled");
        $(this).find(".accordion-arrow").addClass("rolled");
    } else {
        $(".sub-menu-3").slideUp();
        $(this).next(".sub-menu-3").slideUp();
        $(".accordion-arrow").removeClass("rolled");
        $(this).find(".accordion-arrow").removeClass("rolled");
    }
});

// ============== Handlig close menu button click =============== //

$(".close-menu-btn").on("click", function() {
    $(".sub-menu").removeClass("active");
    $(".main-menu > ul > .menu-item > button").removeClass("active");
})

