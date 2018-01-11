$(document).ready(function () {
    //Move to Bottom
    window.scrollTo(0, document.body.clientHeight);
    //Change the Day and Night
    $('.dayC').hide();
    $('#theme').click(function () {
        $(this).toggleClass('dayTheme nightTheme');
        $("#build").toggleClass("night day");
        // $('.dayTheme').html('<i class="fa fa-sun-o" aria-hidden="true"></i>');
        // $('.nightTheme').html('<i class="fa fa-star" aria-hidden="true"></i>');
        $('.dayC').fadeToggle(1000)
        $('.nightC').fadeToggle(1000);

    })

    //Make Animation according to Scroll
    $(window).scroll(function () {
        var x = $(document).scrollTop();
        var tar = $("#guide");
        if (x <= 400 || x >= 3000) {
            tar.addClass("move");
        } else {
            tar.removeClass("move");
        }
    });
    //For Animation of Info 
    $('.messageI').slideToggle(0);
    $('#detail').click(() => {
        $('.messageI').slideToggle(500);
    });

    //For Window Animation
    $(".wind ul li").addClass("animated bounceOutRight");
    $(".wind").on('mouseenter', function () {
        $(this).addClass("wind2");
        var con = $(this).find(" ul li");
        con.addClass("bounceInLeft");
        con.removeClass("bounceOutRight");
    })
    $(".wind").on('mouseleave', function () {
        var k = $(this);
        var con = $(this).find(" ul li");
        con.removeClass("bounceInLeft");
        con.addClass(" bounceOutRight");
        k.removeClass("wind2");

    })

    //For Animation of Extra Details
    $('#extraClose').click(() => {
        $('#extraBox').removeClass('bounceInLeft');
        $('#extraBox').addClass('bounceOutRight');

    });
    $('.door').on('click', () => {
        $('#extraBox').removeClass('bounceOutRight');
        $('#extraBox').addClass('bounceInLeft');
    })
    $('#house .floor:nth-child(1) .door').click(() => {
        $('#extraBox .extraHead .headHere').html(obj.aboutMe.heading);
        $('#extraBox .content').html(obj.aboutMe.content);
    })
    $('#house .floor:nth-child(2) .door').click(() => {
        $('#extraBox .extraHead .headHere').html(obj.studies.heading);
        $('#extraBox .content').html(obj.studies.content);
        progBar();
    })
    $('#house .floor:nth-child(3) .door').click(() => {
        $('#extraBox .extraHead .headHere').html(obj.web.heading);
        $('#extraBox .content').html(obj.web.content);
    })
    $('#house .floor:nth-child(4) .door').click(() => {
        $('#extraBox .extraHead .headHere').html(obj.programing.heading);
        $('#extraBox .content').html(obj.programing.content);
        progBar();

    })
    $('#house .floor:nth-child(5) .door').click(() => {
        $('#extraBox .extraHead .headHere').html(obj.exp.heading);
        $('#extraBox .content').html(obj.exp.content);
    })
});

function progBar() {
    $('.progressBar').each(function () {
        var value = $(this).html();
        $(this).html(`
<span style='background-color:lightblue;left:0px;top:0px;position:absolute;width:`+ value + `%;height:100%;padding:1px;z-index:-1;'></span><span style='z-index:2'>` + value + `%</span>
`)
    })
}
var obj = {
    aboutMe: {
        heading: `<span style='font-family:monospace'>About Me</span>`,
        content: `
        <span class='monospace' style='font-size:2.5em;    text-shadow: 2px 2px 2px #fff;'>I would be better to provide a bit of introduction first</span>
        <ul class='size15'>
        <li>My name is Manish Aneja.</li>
        <li>At present,I am a B.Tech Student</li>
        <li>Not a sports person excluding some specific Events</li>
        <li>Always ready to explore new Things</li>
        <li>And now if I say about technical stuff,most of the work done by me is related to Web Domain.</li>
        <li>Also a Member of GDG-BVP Core Team.</li>
        </ul>
        `
    },
    studies: {
        heading: `<span style='font-family:monospace'>Academic Report</span>`,
        content: `
        <span class='monospace' style='font-size:2.5em;    text-shadow: 2px 2px 2px #fff;'>Just a Brief Information about my Studies</span>
        <ul class='size15'>
        <li>Completed my secondary and senior secondary Education from Sri Guru Nanak Public School.</li>
        <li>Score of 10th (Year:2013)=><br>
        <span class="progressBar">95.5</span>
        </li>
        <li>Score of 12th (Year:2015) =><br>
        <span class="progressBar">90</span>
        </li>
        <li> Studying Computer Science Engineering from bharati vidyapeeth's college of engineering (New Delhi) under guru gobind singh indraprastha university. 
        </li>
        <li> I am currently in 3rd Year of B.Tech.
        </li>
        </ul>
        `
    },
    web: {
        heading: `Web Skills`,
        content: `
        <span class='monospace' style='font-size:2.5em;    text-shadow: 2px 2px 2px #fff;'>This Section tells what all things I know about Web</span>
        <ul class='size15'>
        <li>For Front-End Development</li>
        <li>
            <ul class='specialList red'>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>JSP</li>
                <li>ESP</li>
            </ul>
        </li>
        <li>Libaries Used for Front-End Development</li>
        <li>
            <ul class='specialList blue'>
                <li>Bootstrap</li>
                <li>Jquery</li>
                <li>AnimateJS</li>
                <li>ReactJs</li>
            </ul>
        </li>
        <li>For Back-End Development</li>
        <li>
            <ul class='specialList red'>
                <li>Java</li>
                <li>NodeJS</li>
            </ul>
        </li>
        <li>FrameWork Used</li>
        <li>
            <ul class='specialList blue'>
                <li>AngularJS</li>
                <li>Angular</li>
                <li>Mongoose</li>
                <li>Express</li>
            </ul>
        </li> `
    }, programing: {
        heading: `Programming Skills`,
        content: `
        <span class='monospace' style='font-size:2.5em;    text-shadow: 2px 2px 2px #fff;'>Programming Languages I know about</span>
        <ul class='size15'>
        <li>Comfort Level in </li>
        <li>C<br>
        <span class="progressBar">70</span>
        </li>
         <li>C++<br>
        <span class="progressBar">75</span>
        </li>
         <li>Java<br>
        <span class="progressBar">80</span>
        </li>
        <li>ECMAScript<br>
        <span class="progressBar">80</span>
        </li> </ul>
        `
    }, exp: {
        heading: `Experience`,
        content: `
        <span class='monospace' style='font-size:2.5em;    text-shadow: 2px 2px 2px #fff;'>Here is the list of Some Minor Works Done By Me. </span>
        <ul class='size15'>
        <li>Java Based Game <a href="https://github.com/manishekaneja/Island-Game">https://github.com/manishekaneja/Island-Game </a></li>
        <li>A Static Copy of BCCI <a href="https://manishekaneja.github.io/BCCI_fake/">https://manishekaneja.github.io/BCCI_fake/</a></li>
        <li>ToDo List <a href="https://github.com/manishekaneja/ToDoList-/">https://github.com/manishekaneja/ToDoList-/</a></li>
        <li>Static UI centric Website <a href="https://manishekaneja.github.io/GDC/">https://manishekaneja.github.io/GDC/</a> </li>
        </ul>
        `
    }
}