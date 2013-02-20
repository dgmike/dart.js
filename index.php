<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>dart v4</title>
        <link rel="stylesheet" href="style/style.css" media="all">
        <script>
            // UOL - Dart
            var DEaff="parvirgula";
            var DEchan="parvirgula<?php echo empty($_GET['DEchan']) ? 'diversao' : $_GET['DEchan'] ?>";
            var DEsubc="capa";
            var Expble=1; 
            var DEcmpng=1; 
            var DEGroup=6;
        </script>
        <script src="js/dart.v4.js"></script>
    </head>
    <body class="home_canal canal_diversao">
        <section id="page" class="largura_canal" style="z-index: 2">
            <div id="container">
                <h1>dart v4</h1>
                
                <hr />
                
                <p>Esta página está aberta a <time id="timer">0s</time></p>

                <script>
                    function refreshAllAds() {
                        var f = document.forms[0];
                        DEchan = f.DEchan.value;
                        DEsubc = f.DEsubc.value;
                        DEads.refresh();
                    }

                    function removeBG() {
                        if (!confirm("Tem certeza? Devido a natureza desta publicidade\
                            \na mesma não aparecerá novamente")) return;
                        var link = document.getElementById('DEBGIMG');
                        if (link) {
                            link.parentNode.removeChild(link)
                        }
                    }

                    function openIt() {
                        var chan = document.forms[0].DEchan.value;
                        chan = chan.replace('parvirgula', '');
                        window.location.search = '?DEchan=' + chan
                    }
                    var timer = 0;
                    setInterval("document.getElementById('timer').innerHTML = ++timer + 's'", 1000);
                </script>
                
                <form>
                    DEchan =
                        <select name="DEchan">
                            <option <?php echo !empty($_GET['DEchan']) && $_GET['DEchan'] == 'diversao'      ? 'selected="selected"' : '' ?>>parvirguladiversao</option>
                            <option <?php echo !empty($_GET['DEchan']) && $_GET['DEchan'] == 'musica'        ? 'selected="selected"' : '' ?>>parvirgulamusica</option>
                            <option <?php echo !empty($_GET['DEchan']) && $_GET['DEchan'] == 'inacreditavel' ? 'selected="selected"' : '' ?>>parvirgulainacreditavel</option>
                            <option <?php echo !empty($_GET['DEchan']) && $_GET['DEchan'] == 'lifestyle'     ? 'selected="selected"' : '' ?>>parvirgulalifestyle</option>
                            <option <?php echo !empty($_GET['DEchan']) && $_GET['DEchan'] == 'home'          ? 'selected="selected"' : '' ?>>parvirgulahome</option>
                            <option <?php echo !empty($_GET['DEchan']) && $_GET['DEchan'] == 'esporte'       ? 'selected="selected"' : '' ?>>parvirgulaesporte</option>
                            <option <?php echo !empty($_GET['DEchan']) && $_GET['DEchan'] == 'famosos'       ? 'selected="selected"' : '' ?>>parvirgulafamosos</option>
                            <option <?php echo !empty($_GET['DEchan']) && $_GET['DEchan'] == 'libido'        ? 'selected="selected"' : '' ?>>parvirgulalibido</option>
                            <option <?php echo !empty($_GET['DEchan']) && $_GET['DEchan'] == 'caliente'      ? 'selected="selected"' : '' ?>>parvirgulacaliente</option>
                        </select><br />
                    DEsubc = <select name="DEsubc">
                            <option>capa</option>
                            <option>outros</option>
                        </select><br />
                    <button type="button" onclick="refreshAllAds()">atualizar</button>
                    <button type="button" onclick="removeBG()">limpar background</button>
                    <button type="button" onclick="openIt()">abrir nova pagina neste canal</button>
                </form>
                
                <hr />

                <p>Publicidade <code>(728x90, 1)</code></p>
                <div data-publicidade="728x90, 1" class="deshow" id="publicidade-728x90"></div>

                <p>Publicidade <code>(300x250, 5)</code></p>
                <script>DEShow('300x250', 5)</script>

                <p>Publicidade <code>(120x30, 6)</code></p>
                <div data-size="120x30" data-pos="6" rel="publicidade"></div>

                <p>Publicidade <code>(300x600, 3)</code></p>
                <script>DEads.add("300x600", 3)</script>

                <p>Publicidades <code>(1x1, 11)</code> e <code>(1x1, 12)</code> juntas</p>
                <script>DEShow("1x1", 11); DEShow("1x1", 12);</script>
            </div>
        </section>
    </body>
</html>