(function () {
    'use strict';

    var language = sessionStorage.getItem("language");

    if (language === null) {
        language = "english";
    }

    var signNumber = sessionStorage.getItem("signNumber");

    if (signNumber === null) {
        signNumber = 1;
    } else {
        signNumber = parseInt(signNumber);
    }

    var Sign = {
        init: function (logo, englishTitle, englishContent, frenchTitle, frenchContent) {
            this.mLogo = logo;
            this.mEnglishTitle = englishTitle;
            this.mEnglishContent = englishContent;
            this.mFrenchTitle = frenchTitle;
            this.mFrenchContent = frenchContent;
        }
    };

    var menu1 = document.getElementsByClassName("credits_menu")[0];

    var menu2 = document.getElementsByClassName("index_menu")[0];

    var menu3 = document.getElementsByClassName("signs_menu")[0];

    var credits = document.getElementById("credits");

    var index = document.getElementById("index");

    var britishFlag = document.getElementById("britishFlag");

    var frenchFlag = document.getElementById("frenchFlag");

    var number = document.getElementsByName("signNumber")[0];

    var send = document.getElementById("send");

    var message = document.getElementById("error");

    var sign = document.getElementById("signs");

    var previous = document.getElementById("previousSign");

    var next = document.getElementById("nextSign");


    function menu() {
        switch (language) {
            case "french":
                menu1.innerHTML = "Crédits";
                menu2.innerHTML = "Accueil";
                menu3.innerHTML = "Panneaux";
                break;
            case "spanish":
                menu1.innerHTML = "Créditos";
                menu2.innerHTML = "Home";
                menu3.innerHTML = "Placas";
                break;
            case "german":
                menu1.innerHTML = "Quellenangaben";
                menu2.innerHTML = "Home";
                menu3.innerHTML = "Platten";
                break;
            default:
                menu1.innerHTML = "Credits";
                menu2.innerHTML = "Home";
                menu3.innerHTML = "Signs";
        }
    }

    function menu_credits() {
        menu1.addEventListener("click", function () {
            document.location = "credits.html";
        });
    }

    function menu_index() {
        menu2.addEventListener("click", function () {
            document.location = "index.html";
        });
    }

    function menu_signs() {
        menu3.addEventListener("click", function () {
            document.location = "signs.html";
        });
    }


    /***************/
    /*** CREDITS ***/
    /***************/


    if (credits !== null) {
        credits.onload = function () {
            menu();
            menu_index();
            menu_signs();
            var first = document.getElementById("par1");
            var second = document.getElementById("par2");
            switch (language) {
                case "french":
                    first.innerHTML = "Les ressources appartiennent au Museum de La Rochelle.";
                    second.innerHTML = "Cette application a été créée dans le cadre d'un stage au l3i de l'université de La Rochelle par Christian Marquay.";
                    break;
                case "spanish":
                    first.innerHTML = "Los recursos pertenecen al Museum de La Rochelle.";
                    second.innerHTML = "Esta aplicación fue creada como parte de una pasantía en el L3I de la Universidad de La Rochelle por Christian Marquay.";
                    break;
                case "german":
                    first.innerHTML = "Die Ressourcen gehören das Museum von La Rochelle.";
                    second.innerHTML = "Diese Anwendung wurde im Rahmen eines Praktikums L3i Universität La Rochelle von Christian Marquay erstellt.";
                    break;
                default:
                    first.innerHTML = "The resources belong to the Museum of La Rochelle.";
                    second.innerHTML = "This application was created as part of an internship at l3i of the University of La Rochelle by Christian Marquay.";
            }
        };
    }


    /***************/
    /***   HOME  ***/
    /***************/


    if (index !== null) {
        index.onload = function () {
            menu();
            menu_credits();
            menu_signs();
            switch (language) {
                case "french":
                    number.placeholder = "Panneau";
                    send.value = "OK";
                    break;
                case "spanish":
                    number.placeholder = "Placa";
                    send.value = "Listo";
                    break;
                case "german":
                    number.placeholder = "Platte";
                    send.value = "Fertig";
                    break;
                default:
                    number.placeholder = "Sign";
                    send.value = "Done";
            }
            message.innerHTML = "";
        };
    }

    if (britishFlag !== null) {
        britishFlag.addEventListener('click', function () {
            language = "english";
            sessionStorage.setItem("language", language);
            menu1.innerHTML = "Credits";
            menu2.innerHTML = "Home";
            menu3.innerHTML = "Signs";
            number.placeholder = "Sign";
            send.value = "Done";
            message.innerHTML = "";
        });
    }

    if (frenchFlag !== null) {
        frenchFlag.addEventListener("click", function () {
            language = "french";
            sessionStorage.setItem("language", language);
            menu1.innerHTML = "Crédits";
            menu2.innerHTML = "Accueil";
            menu3.innerHTML = "Panneaux";
            number.placeholder = "Panneau";
            send.value = "OK";
            message.innerHTML = "";
        });
    }

    if (send !== null) {
        send.addEventListener("click", function () {
            var signInput = document.getElementById("signNumber");
            if (is_int(signInput.value)) {
                if (signInput.value < 1 || signInput.value > 26) {
                    notExpected();
                } else {
                    signNumber = signInput.value;
                    message.innerHTML = "";
                    sessionStorage.setItem("language", language);
                    sessionStorage.setItem("signNumber", signNumber);
                    document.location = "signs.html";
                }
            } else {
                notExpected();
            }
        });
    }

    function notExpected() {
        switch (language) {
            case "french":
                message.innerHTML = "Merci de choisir un numéro de panneau entre 1 et 26.";
                break;
            case "spanish":
                message.innerHTML = "Gracias a elegir un número de placa entre 1 y 26.";
                break;
            case "german":
                message.innerHTML = "Wir danken Ihnen, ein Platte Zahl zwischen 1 und 26 zu wählen.";
                break;
            default:
                message.innerHTML = "Please choose a sign number between 1 and 26.";
        }
    }

    function is_int(value) {
        return parseFloat(value) === parseInt(value) && !isNaN(value);
    }


    /***************/
    /***  SIGNS  ***/
    /***************/


    if (sign !== null) {
        sign.onload = function () {
            menu();
            menu_credits();
            menu_index();

            var sign0 = Object.create(Sign);
            sign0.init(
                "images/sign_24.png",
                "Instruments Classifications<br />" +
                "<br />" +
                "Ethnomusicology",
                "Ethnomusicology is the study of musical facts in traditional characters in various ethnic groups and cultural communities.<br />" +
                "As a field of study originating from the West, the limitation due to the natural limitation imposed by its cultural labelling is taken into account.<br />" +
                "At the beginning of the 20th century, two Germans, Sachs and Hornbostel had established a classification for all known musical instruments, based upon the criteria on the sound production.<br />" +
                "• chordophones (vibrating strings)<br />" +
                "• membranophones (vibrating membranes)<br />" +
                "• idiophones (percussions without any membrane)<br />" +
                "• aero phones (wind instrument)<br />" +
                "Subcategories are determined by the way of playing (friction, percussion, pinching, blowing, etc.) or the arrangement of the structural elements of the instruments.",
                "Classifications des instruments<br />" +
                "<br />" +
                "L’ethnomusicologie",
                "L’ethnomusicologie est l’étude des faits musicaux<br />" +
                "de caractères traditionnels dans les divers groupes<br />" +
                "ethniques et communautés culturelles.<br />" +
                "Discipline d’origine occidentale, elle reconnaît<br />" +
                "naturellement les limites imposées par son propre<br />" +
                "marquage culturel.<br />" +
                "Au début du XXe siècle, deux allemands, Sachs<br />" +
                "et Hornbostel, ont établi pour tous les instruments<br />" +
                "connus une classification dont les critères sont le mode<br />" +
                "de production du son.<br />" +
                "Ils distinguent quatre familles d’instruments :<br />" +
                "• les cordophones (à cordes vibrantes)<br />" +
                "• les membranophones (à membrane)<br />" +
                "• les idiophones (à percussion sans membrane)<br />" +
                "• les aérophones (instruments à vent)<br />" +
                "Des sous-familles sont déterminées par le mode d’action :<br />" +
                "friction, percussion, pincement, insufflation, etc.<br />" +
                "ou d’agencement des éléments structurants<br />" +
                "des instruments."
            );
            var sign1 = Object.create(Sign);
            sign1.init(
                "images/sign_1.png",
                "Museum of Natural History La Rochelle<br />" +
                "<br />" +
                "Between history and territory",
                "Facing the ocean bridging the city with the land far away, surrounded by the islands and the marshlands where fresh and salt water meet, La Rochelle has a very particular condition of not only rich, but also divers. The city’s Museum of Natural History brings the testimony of the thirst of adventures and knowledge that for two centuries drove all different presiding actors during its creation.<br />" +
                "The collections of natural history and ethnography have provoked their audacious companies and at times crossing path with the progress in science, the formation of the Earth, evolution of plants and animals, as well as the diversity of mankind. <br />" +
                "They set the incredible richness in the world an in the region that the museum has been focusing: to concentrate upon and classify a better exposition for the future generation.",
                "Le muséum de La Rochelle<br />" +
                "<br />" +
                "Entre histoire et territoire",
                "Face à l'océan qui la met en contact avec des terres lointaines, entourée d'îles et de marais où se mêlent eaux douces et salées, La Rochelle jouit d'une situation originale au coeur d'un espace aussi riche que divers. Son muséum d'histoire naturelle témoigne de la soif d'aventures et de connaissances qui anima, deux siècles durant, les différents acteurs ayant présidé à sa création.<br />" +
                "Les collections d'histoire naturelle et d'ethnographie évoquent leurs entreprises audacieuses et racontent tout à la fois la progression des sciences, la formation de la Terre, l'évolution des plantes et des animaux et la diversité humaine. Elles mettent en scène l'incroyable richesse du monde et celle de la région dont le muséum concentre et classe la mémoire pour mieux l'exposer au regard des générations à venir."
            );
            var sign2 = Object.create(Sign);
            sign2.init(
                "images/sign_2.png",
                "Tidal Marsh<br />" +
                "A Man-Made Landscape",
                "Since the Middle Age, humans have been developing these marshes, which sometimes submerged by the tide or at other times flooded by fresh water that in turn, enriching the natural source of fishing, oysters and mussels farming and salt mining. <br />" +
                "Certain places have been under protection by sea wall and dried for farming and culture. <br />" +
                "The result is a complementary and interdependent mosaic territory that brings together coastal mudflats, salt marshes –dried or wet-, and became an exceptional diversity of the living organisms.",
                "Les marais littoraux<br />" +
                "Un paysage façonné par l’homme",
                "Depuis le Moyen-Age, l’homme aménage ces marais<br />" +
                "tantôt submergés par la marée tantôt inondés d’eau<br />" +
                "douce dont la richesse naturelle a favorisé la pêche,<br />" +
                "l’ostréiculture, la mytiliculture ou l’exploitation du sel.<br />" +
                "Certains espaces ont été protégés par des digues<br />" +
                "et asséchés pour permettre l’élevage et la culture.<br />" +
                "Il en résulte une mosaïque de territoires complémentaires<br />" +
                "et interdépendants qui rassemble des vasières littorales,<br />" +
                "des marais salés, desséchés ou mouillés et abrite<br />" +
                "une exceptionnelle diversité d’organismes vivants."
            );
            var sign3 = Object.create(Sign);
            sign3.init(
                "images/sign_3.png",
                "Birds, the Master of Marshlands<br />" +
                "<br />" +
                "An image of biodiversity",
                "The development took place since the Middle Age, has been gradually induced the rise of a landscape consisted of a various environment hosting a wide variety of living organism.<br />" +
                "At least 250 species of migrating birds or sedentary frequent polders, dried or wet or dried salt water marshlands adding to the mud lands and hills that bordering these humid zones. <br />" +
                "Each space goes for species of birds that when gathered, they formed a remarkable composition, as a matter of fact, the most magnificent one of marshland biodiversity.",
                "Les oiseaux, seigneurs des marais<br />" +
                "<br />" +
                "Une image de la biodiversité",
                "Les aménagements mis en oeuvre depuis le Moyen Age ont, peu à peu, donné naissance à un paysage composé d'une mosaïque de milieux hébergeant une grande diversité d'organismes vivants<br />" +
                "Pas moins de 250 espèces d'oiseaux migrateurs ou sédentaires fréquentent polders, marais desséchés, mouillés ou gâts auxquels s'ajoutent les vasières et coteaux qui bordent ces zones humides<br />" +
                "Chaque espèce accueille des oiseaux caractéristiques qui, réunis, forment une des composantes les plus remarquables de la biodiversité des marais."
            );
            var sign4 = Object.create(Sign);
            sign4.init(
                "images/sign_4.png",
                "The Marsh : An Endangered Territory<br />" +
                "<br />" +
                "What marshes for tomorrow? ",
                "Since thirty years ago, the rapid decline on the surface of humid natural meadows instigated by the changes in agricultural practices, hydrological resources modifications, pollution, urbanization and the introduction of the invasive species, brought up the questions on the survival of the species sheltered and on the maintenance of the biodiversity in these environments.<br />" +
                "Knowing the values of this natural heritage and the challenges entailing towards its degradation, one must ensure that those who are involved and exploring the area be fully aware to the necessity to reconcile human activities and nature preservation.",
                "Le marais un territoire menacé<br />" +
                "<br />" +
                "Quel marais pour demain ?",
                "Depuis une trentaine d'années, la diminution rapide de la surface des prairies naturelles humides, provoquée par le changement des pratiques agricoles, les modifications du réseau hydrographique, les pollutions, l'urbanisation et l'introduction d'espèces invasives, pose la question de la survie des espèces qu'elles abritent et du maintien de la biodiversité de ces milieux.<br />" +
                "Faire connaître la valeur de ce patrimoine naturel et les problèmes qu'entraîne sa dégradation devrait permettre à tous ceux qui fréquentent ces espaces de prendre conscience de la nécessité de concilier activités humaines et préservation de la nature."
            );
            var sign5 = Object.create(Sign);
            sign5.init(
                "images/sign_5.png",
                "Lafaille Display Room",
                "After the popularity of the era of curiosity in 17th century, the Enlightenment Age is the era with the real passion for natural history. The Natural History Museum of Clement Lafaille (1718-1782) took part in this motion.<br />" +
                "In 1770, Clement Lafaille, a naturalist from La Rochelle donated his library, including the furniture set and its contents to the La Rochelle Academy of Letters under the request that they be made open for public. Becoming the property of the City of La Rochelle in 1791, this legacy became the Museum’s initial core, which was installed into these walls in 1832.<br />" +
                "For many years, the furniture had been used, adapted, partially scattered before it was realized that the historical values exceeded its value of use. The whole piece was reassembled in the form of a museum in the 18th century style two years after being classified as historical monument in 1956.<br />" +
                "In the occasion of the recent renovation of the Museum, with the support from the Ministry of Culture, from the Department of Charente-Maritime and from the city of La Rochelle, the sets of furniture were restored by qualified craftsmen under the guides of the Historical Monuments.",
                "Le Cabinet Lafaille",
                "Après la vogue des cabinets de curiosités au XVIIe siècle, le Siècle des Lumières est celui d'un véritable engouement pour l'histoire naturelle. Le cabinet d'histoire naturelle de Clément Lafaille (1718-1782) s'inscrit dans ce mouvement.<br />" +
                "En 1770, Clément Lafaille, naturaliste rochelais, fait don à l'Académie des Belles Lettres de La Rochelle de sa bibiothèque, de cet ensemble mobilier et de son contenu en vue d'une présentation au public. Devenu bien municipal de la Ville de La Rochelle en 1791, ce legs constitue le noyau initial du muséum, qui s'installe dans ces murs en 1832.<br />" +
                "Pendant plusieurs années, le mobilier est utilisé, adapté, partiellement dispersé avant que l'on ne prenne conscience que sa valeur historique prime sur sa valeur d'usage. Classé monument historique en 1956, l'ensemble est reconstitué en cabiner deux ans plus tard, dans le style du XVIIIe siècle.<br />" +
                "A l'occasion de la rénovation récente du muséum avec le soutien du Ministère de la Culture, du Département de la Charente-Maritime et de la Ville de La Rochelle, l'ensemble du mobilier a été restauré par des artisans qualifiés, sous l'égide des Monuments Historiques."
            );
            var sign6 = Object.create(Sign);
            sign6.init(
                "images/sign_6.png",
                "The Fossils of the First Rivers<br />" +
                "<br />" +
                "Life Evolution Pre-Jurassic",
                "Charente-Maritime is mostly covered by older sedimentary rocks dated less than 200 million years from the Mesozoic (secondary) era. <br />" +
                "The oldest terrains are therefore no longer visible. In order to reconstitute the stages of evolution during the Paleozoic (the first) era and before Precambrian Era, one must resort to the evidences from outside our region. <br />" +
                "The closest one can be found in Vendee and Limousin, the oldest ones are in Groenland, Australia, Canada, Mauritania and South Africa.",
                "Les fossiles des mers primaires<br />" +
                "<br />" +
                "L’évolution de la vie<br />" +
                "avant le Jurassique",
                "La Charente-Maritime est essentiellement couverte<br />" +
                "de terrains sédimentaires âgés de moins de 200 millions<br />" +
                "d’années, datés du Mésozoïque (ère secondaire).<br />" +
                "Les terrains plus anciens ne sont donc pas visibles.<br />" +
                "Pour reconstituer les étapes de l’évolution pendant<br />" +
                "le Paléozoïque (ère primaire) et avant (Précambrien),<br />" +
                "il faut recourir à des témoignages extérieurs à notre région.<br />" +
                "Les plus proches se trouvent en Vendée et en Limousin,<br />" +
                "les plus anciens au Groenland, en Australie, au Canada,<br />" +
                "en Mauritanie et en Afrique du Sud."
            );
            var sign7 = Object.create(Sign);
            sign7.init(
                "images/sign_7.png",
                "Fossils from the missing shores<br />" +
                "<br />" +
                "Marine invasions from Jurassic ",
                "In Mesozoic (secondary era), where the world does not resemble at all to the one we know, Charente-Maritime is a scene of succession of invasion and the retreat of the sea. <br />" +
                "Geologists have identified six times where the sea over flooded the continent and retreated, leaving it almost completely emerged. <br />" +
                "Within these major phases, minor variations took place. These events caused the deposits of sediments very rich in fossils, which since the 19th century have been very attractive to geologists to the fact that a part of geology is born and developed here.",
                "Les fossiles témoins des rivages disparus<br />" +
                "<br />" +
                "Les invasions marines depuis<br />" +
                "le Jurassique",
                "Au Mésozoïque (ère secondaire), dans un monde<br />" +
                "qui ne ressemble en rien à celui que nous connaissons,<br />" +
                "la Charente-Maritime est le théâtre d’une succession<br />" +
                "d’invasions et de retraits de la mer.<br />" +
                "Les géologues ont repéré qu’à six reprises la mer<br />" +
                "déborde sur le continent et se retire pour finir<br />" +
                "par le laisser presque complètement émergé.<br />" +
                "À l’intérieur de ces phases majeures, des variations<br />" +
                "mineures ont eu lieu. Ces événements ont favorisé<br />" +
                "le dépôt de sédiments très riches en fossiles qui,<br />" +
                "depuis le début du XIXe siècle, ont attiré des géologues<br />" +
                "de sorte qu’une partie d e la géologie est née<br />" +
                "et s’est développée ici."
            );
            var sign8 = Object.create(Sign);
            sign8.init(
                "images/sign_8.png",
                "",
                "",
                "",
                ""
            );
            var sign9 = Object.create(Sign);
            sign9.init(
                "images/sign_9.png",
                "Zoological Gallery<br />" +
                "<br />" +
                "Collecting and classifying ",
                "In the 19th century, a number of species continue to increase each day, at the same time with the development in taxidermy, which improves the possibilities of specimens’ conservation and development. The scientists become specialists, the amateurs turn into scientists.<br />" +
                "It all combines to boost the development of the Museum that in 1882, Edouard Beltrémieux –a conservator and the mayor of La Rochelle- was proud to present the Museum that displayed all Cuvier classification, without forgetting the vegetal kingdom. <br />" +
                "The zoology room exhibit a part of the museum’s rich collection of 6.000 pieces in 19th century-style showcases. <br />" +
                "Europeans birds and their tropical neighbors, American and Oceanic unusual mammals and the primates of both the Ancient and the New World. We can also find the species already extinct or endangered that remind us the necessity to preserve biodiversity.",
                "La galerie de zoologie<br />" +
                "<br />" +
                "Collecter, classer",
                "Au XIXe siècle, le nombre d’espèces connues augmente<br />" +
                "chaque jour, parallèlement les progrès de la taxidermie<br />" +
                "améliorent les possibilités de conservation et de mise<br />" +
                "en valeur des spécimens. Les savants se spécialisent<br />" +
                "et d’amateurs éclairés se transforment en scientifiques.<br />" +
                "Le tout se conjugue pour impulser le développement<br />" +
                "du Muséum si bien qu’en 1882 Édouard Beltrémieux,<br />" +
                "conservateur et maire de La Rochelle, peut être fier<br />" +
                "de son musée qui présente toutes les classes définies<br />" +
                "par Cuvier, sans oublier le règne végétal.<br />" +
                "La salle de zoologie expose une partie des collections<br />" +
                "du Muséum riches de 6 000 pièces dans des vitrines<br />" +
                "qui rappellent l’esprit du XIXe siècle. Oiseaux européens<br />" +
                "et tropicaux voisinent avec des mammifères insolites<br />" +
                "d’Australie et d’Océanie et des primates de l’Ancien<br />" +
                "et du Nouveau Monde. On y trouve aussi des espèces<br />" +
                "déjà disparues ou en voie d’extinction qui alertent<br />" +
                "sur la nécessité de préserver la biodiversité."
            );
            var sign10 = Object.create(Sign);
            sign10.init(
                "images/sign_10.png",
                "Fauna from the coast to abyss<br />" +
                "<br />" +
                "Biogeography of North-East Atlantic species.",
                "The fauna of North Atlantic is dispersed according to two grand axes, that is, the horizontal axe spreading from the shore to the open sea; and the vertical one ranging from the surface to the sea bed. <br />" +
                "During the geological history, the changing physical characteristics of the environment have forced the species to diversify and evolve in order to adapt to the new conditions and ensure their survivals. <br />" +
                "The algae, the mollusks, the echinoderms, the crustaceans, bony and cartilaginous fish (sharks, rays, chimeras and sea mammals) are showing the convincing evidence of these adaptations. <br />" +
                "However, the species represented here are only small examples of the living organisms’ diversity as many other species are yet to be discovered.",
                "Faune de la côte aux abysses<br />" +
                "<br />" +
                "Biogéographie des espèces<br />" +
                "de l'Atlantique nord-est",
                "La faune de l’Atlantique nord-est se distribue selon<br />" +
                "deux axes, l’un horizontal de la côte vers le grand large,<br />" +
                "l’autre vertical de la surface vers les profondeurs de l’océan.<br />" +
                "Au cours de l’histoire géologique, les caractéristiques<br />" +
                "physiques du milieu ont changé obligeant les espèces<br />" +
                "à se diversifier et à évoluer pour s’adapter aux nouvelles<br />" +
                "conditions et assurer leur survie.<br />" +
                "Les algues, les mollusques, les échinodermes,<br />" +
                "les crustacés, les poissons osseux et cartilagineux<br />" +
                "(requins, raies, chimères et les mammifères marins),<br />" +
                "apportent des preuves convaincantes de ces adaptations.<br />" +
                "Cependant, les espèces représentées ici ne constituent<br />" +
                "qu’un faible échantillon de la diversité des organismes<br />" +
                "vivants dont beaucoup d’espèces restent à découvrir."
            );
            var sign11 = Object.create(Sign);
            sign11.init(
                "images/sign_11.png",
                "Cruising the Ocean<br />" +
                "<br />" +
                "Discovering the Unknown World",
                "The first ocean cruises have been contributed to the increase of knowledge of various fields.<br />" +
                "Biological oceanographic has progressed due the specimen harvesting which enables a better knowledge to the distribution of the deep-sea species, besides the fauna, the polar flora and the fossils.   <br />" +
                "Physical oceanographic has seen notable advances thanks to the physical and chemical analysis of water and sea, enriching the field of hydrology which studies all water and its currents, the science of marine or atmospheric currents. <br />" +
                "Another field of science encountering an important development is the bathymetry which measures the depth of the sea; sedimentology studying the sedimentation of the ocean floor; meteorology that examines the atmospheric phenomenon; and cartography -the one establishing the traces of under-water reliefs and the shores-. <br />" +
                "These villages have also enhances glaciology, botany and bacteriology.",
                "Les campagnes océanographiques<br />" +
                "<br />" +
                "A la découverte des mondes inconnus",
                "Les premières campagnes océanographiques ont contribué à l'accroissement des connaissances dans plusieurs domaines.<br />" +
                "L'océanographie biologique a progressé du fait de la récolte de spécimens qui ont permis de mieux connaître la répartition des espèces des profondeurs ainsi que la faune et la flore polaires et les fossiles.<br />" +
                "L'océanographie physique a connu des avancées notoires grâce aux analyses physiques et chimiques de l'eau de mer qui ont enrichi l'hydrographie laquelle étudie toutes les eaux et la courantologie, science des courants marins ou atmosphériques.<br />" +
                "D'autres disciplines ont connu un essor important : la bathymétrie qui mesure les profondeurs marines, la sédimentologie qui a pour objet la sédimentation des fonds marins, la météorologie qui examine les phénomènes atmosphériques et la cartographie qui établit le tracé des reliefs sous-marins et des côtés.<br />" +
                "Ces campagnes ont également enrichi la glaciologie, la botanique et la bactériologie."
            );
            var sign12 = Object.create(Sign);
            sign12.init(
                "images/sign_12.png",
                "Mollusks and tropical environment<br />" +
                "<br />" +
                "Tropical Malacology",
                "Human collect shells since very long time ago, either as nourishment, or object of decoration, or even as money. <br />" +
                "Shell is the common name given to mollusk furnished with a shell. The word also means the chalky casing that composes its skeleton, and more than just a simple house where it seeks refuge. This is secreted by the coat, a material surrounding the body of mollusk.<br />" +
                "The shells display a huge form diversity, textures, colored motives that are used by the first naturalists to develop the classification while doing the comparison on the soft part and conducting genetic studies.",
                "Mollusques et environnements tropicaux<br />" +
                "<br />" +
                "Malacologie tropicale",
                "L'homme a récolté des coquillages depuis les temps les plus anciens tantôt comme nourriture, tantôt comme objet de décoration, ou comme monnaie d'échange.<br />" +
                "Coquillage est le nom donné dans la langue courante aux mollusques pourvus d'une coquille. Le mot désigne aussi l'enveloppe calcaire seule qui, plus qu'une simple maison où l'animal trouve refuge, constitue son squelette. Celui-ci est sécrété par le manteau, tissu qui entoure le corps du mollusque.<br />" +
                "Les coquilles présentent une grande diversité de formes, de textures, de motifs colorés qui servirent aux premiers naturalistes à établir une classification qui maintenant se fait par comparaisan des parties molles et étude génétique."
            );
            var sign13 = Object.create(Sign);
            sign13.init(
                "images/sign_13.png",
                "The drawing display room of the Museum<br />" +
                "<br />" +
                "Understanding and Distributing the Scientific Thoughts",
                "During the 18th century, the first display room of natural history consisted of drawings, albums and manuscripts. Since 1834, scientists association, like The Association of Natural Science of Charente Maritime, gathered naturalists studying the regional natural heritage and those who profusely produced scientific documents. These documents are often accompanied by drawings, mostly done in the field and as a result of meticulous observations.<br />" +
                "This is the multiplication period of the flora and fauna inventories besides scientific publications illustrated with drawings, geological section, map, …<br />" +
                "Naturalists studies, like Clement Lafaille, the father and son of d’Orbigny, John James Audobon in his early years, Jean Rene Constant Quoy, Emile and Edouard Beltremieux, Georges Bernard as well as others who have contributed to the enrichment of the foundation of the Museum.<br />" +
                "All of these works of art are in fragile state, and in order to display them in one piece without tampering its condition, the exhibition was limited to 3 months.",
                "Le cabinet de dessins du Muséum<br />" +
                "<br />" +
                "Comprendre et diffuser la pensée scientifique",
                "Au XVIIIe siècle, les premiers cabinets d'histoire naturelle comprennent dessins, albums et manuscrits. Dès 1834, des sociétés savantes, comme la Société des sciences naturelles de la Charente-Maritime regroupent des naturalistes qui étudient le patrimoine naturel régional et produisent une profusion de documents scientifiques. Ils sont accompagnés de dessins exécutés la plupart du temps sur le terrain et témoignant d'une observation minutieuse.<br />" +
                "Cette période voit se multiplier les inventaires de flores et de faunes ainsi que les publications scientifiques illustrées de dessins, coupes géologiques, cartes ...<br />" +
                "Les études des naturalistes comme Clément Lafaille, les d'Orbigny, père et fils, Jean-Jacques Audubon dans sa jeunesse, Jean René Constant Quoy, Emile et Edouard Beltrémieux, Georges Bernard et bien d'autres encore ont contribué à enrichir le fonds du Muséum.<br />" +
                "Toutes ces oeuvres sont fragiles et pour les présenter dans leur ensemble sans altérer leur fraîcheur, le temps d'exposition a été limité à 3 mois."
            );
            var sign14 = Object.create(Sign);
            sign14.init(
                "images/sign_14.png",
                "The Travelling Naturalists from La Rochelle<br />" +
                "<br />" +
                "The New World",
                "In the 14th century, navigators such as Magellan, Cartier and Columbus pushed back the limits of the known world, and these Europeans embarked on their tracks discovering the New World. <br />" +
                "In the middle of the 18th century, the spirit of the Enlightenment moved Europe, and a thirst of knowledge like never before triggered scientific expedition. The advancement of navigation and particularly the possibility to calculate their position in the ocean has opened the new horizon and made the exploration of the pacific possible.<br />" +
                "The scientific expedition brought back ample of knowledge which fed both philosophers and men of science witnessing the emerging of new research fields. <br />" +
                "The period illustrated here is from 1799 to 1845, the time of the great political and scientific upheavals. Scientific and political prestige went in synchronize towards improvements. Exploration on 19th century cannot be separated from the intellectual curiosity as a mark of the era.",
                "Voyageurs naturalistes charentais<br />" +
                "<br />" +
                "Un monde nouveau",
                "Au XIVe siècle, des navigateurs tels que Magellan, Cartier et Colomb repoussent les limites du monde connu et les européens se lancent sur leurs traces à la découverte du Nouveau Monde.<br />" +
                "Au milieu du XVIIIe siècle, l'esprit des Lumières anime l'Europe et une soif de connaissance sans pareille suscite des expéditions scientifiques. Les progrès de la navigation et, plus particulièrement, la possibilité de calculer sa position en mer ouvrent de nouveaux horizons et permettent l'exploration du Pacifique.<br />" +
                "Les expéditions scientifiques rapportent des masses de connaissances qui nourrissent autant les philosophes que les hommes de sciences lesquels voient émerger de nouveaux champs de recherche.<br />" +
                "La période illustrée ici s'étend de 1799 à 1845, époque de grands bouleversements politiques et scientifiques. Prestiges scientifique et politique marchent de concert vers le progrès. Les explorations du XIXe siècle sont indissociables de la curiosité intellectuelle qui caractérise l'époque."
            );
            var sign15 = Object.create(Sign);
            sign15.init(
                "images/sign_15.png",
                "The Findings of Travelling Naturalists of Charente<br />" +
                "<br />" +
                "Discovering, Observing, Collecting",
                "We display here several specimens described, according to the narrative of five naturalists, A. Bonpland, A. d’Orbigny, N. Baudin, R.P. Lesson, and J.R.C. Quoy. They went on a mission not only to collect vegetal or animal samples, but also to observe, to measure and to take note all anatomic or biological details. <br />" +
                "They also made drawings to provide as much information as possible regarding certain animals with ephemeral characteristics, such as fish which loses its colors once going out from water. <br />" +
                "Each species found was described scientifically, and those that were observed for the very times were given names.  Another specimen collected is differentiated by their new anatomic details enabling the definition of new genre or new species. <br />" +
                "All of these descriptions contain references for scientific community, and for this reason, the name(s) of the describers are followed by the year of observation and then the name of the species.",
                "Découvertes des voyageurs naturalistes charentais<br />" +
                "<br />" +
                "Découvrir, observer, collecter",
                "Nous exposons ici quelques-uns des spécimens décrits<br />" +
                "d'après les récits des cinq naturalistes, A. Bonpland,<br />" +
                "A. d’Orbigny, N. Baudin, R. P. Lesson et J. R. C. Quoy.<br />" +
                "Ils ont pour mission de récolter des échantillons végétaux<br />" +
                "ou animaux mais aussi d’observer, mesurer, noter<br />" +
                "tous les détails anatomiques ou biologiques.<br />" +
                "Ils réalisent également des dessins pour fixer le plus<br />" +
                "d’informations possible concernant certains animaux<br />" +
                "aux caractéristiques éphémères, les poissons par exemple,<br />" +
                "qui perdent leurs couleurs à peine sortis de l’eau.<br />" +
                "Chaque espèce rencontrée est décrite scientifiquement<br />" +
                "et celles qui sont observées pour la première fois<br />" +
                "reçoivent un nom. D’autres spécimens récoltés<br />" +
                "se distinguent par des détails anatomiques inédits<br />" +
                "qui permettent de définir un nouveau genre<br />" +
                "ou une nouvelle espèce.<br />" +
                "Toutes ces descriptions constituent des références<br />" +
                "pour la communauté scientifique et, pour cette raison,<br />" +
                "le ou les noms des descripteurs accompagnés de l’année<br />" +
                "d’observation suivent le nom de l’espèce."
            );
            var sign16 = Object.create(Sign);
            sign16.init(
                "images/sign_16.png",
                "The last grand scientific expedition <br />" +
                "<br />" +
                "The discovery of Southern Continent",
                "J.S.C. Dumont d’Urville (1790-1842) with the two corvettes, L’Astrolabe and La Zélée leaving Toulon on September 11th, 1837. King Louis-Philippe, passionate about geography, financing this mission, where the goal is to discover the southern pole. The quest began with a two-year journey in the Pacific Islands. On 17 January 1840, having faced thousands of perils and slipping in between gigantic icebergs, he reached the Antarctica, named as the Land of Adelie, the name of his wife.<br />" +
                "Just like other naturalists, J.S.C. Dumont d’Urville also discovered the lifestyle of Oceanic people.<br />" +
                "The Museum possesses a collection of daily objects witnessing their customs and behaviors. <br />" +
                "The scientific results from J.S.C. Dumont’s expedition cover the area of cartography, ethnography and Oceanic natural science. Upon his return, he oversaw the publication of Journey to The South Pole and to the Oceania (du Voyage au pôle sud et dans l’Océanie) that covers 23 volumes and 7 atlas.",
                "Dernière grande expédition scientifique<br />" +
                "<br />" +
                "La découverte du continent austral",
                "J. S. C. Dumont d’Urville (1790-1842) arme<br />" +
                "L’Astrolabe et La Zélée et quitte Toulon le 11 septembre<br />" +
                "1837. Le roi Louis-Philippe, passionné de géographie,<br />" +
                "finance sa mission dont le but est la découverte du pôle<br />" +
                "austral. Il commence par un périple de deux années<br />" +
                "dans les îles du Pacifique. Le 17 janvier 1840, après<br />" +
                "avoir affronté mille périls et s’être faufilé entre d’énormes<br />" +
                "icebergs, il aborde le continent antarctique qu’il baptise<br />" +
                "terre Adélie du nom de sa femme.<br />" +
                "Comme comme d'autres naturalistes, J. S. C. Dumont<br />" +
                "d’Urville découvre le mode de vie des peuples océaniens.<br />" +
                "Le Muséum lui doit une collection d’objets usuels<br />" +
                "qui témoignent de leurs moeurs et coutumes.<br />" +
                "Le bilan scientifique des expéditions de J. S. C. Dumont<br />" +
                "d’Urville est considérable en ce qui concerne<br />" +
                "la cartographie, l’ethnographie et les sciences naturelles<br />" +
                "de l’Océanie. À son retour, il supervise la publication<br />" +
                "du Voyage au pôle sud et dans l’Océanie qui compte<br />" +
                "vingt-trois volumes et sept atlas."
            );
            var sign17 = Object.create(Sign);
            sign17.init(
                "images/sign_17.png",
                "Etienne Loppe, a world vision<br />" +
                "<br />" +
                "Destinies Crossed",
                "It was Etienne Loppe, a conservator between the years of 1919 to 1954, whom the Museum owed its ethnographic collection to.<br />" +
                "Starting from the end of the 19th century, human science made its entrance and E. Loppe would develop this tradition. <br />" +
                "His activities brought the institution to the sixth rang in terms of regional museum, in 1948.<br />" +
                "In La Rochelle, he is the first conservator treating history of mankind from biology and culture point of view. He gave a pedagogic dimension to the Museum by opening it for public in large, particularly scholars.",
                "Etienne Loppé, une vision du monde<br />" +
                "<br />" +
                "Destins croisés",
                "C'est à Etienne Loppé, conservateur entre 1919 et 1954, que le muséum doit sa collection d'etnographie.<br />" +
                "Dès la fin du XIXe siècle, les sciences de l'homme y font leur entrée et E. Loppé va développer cette tradition.<br />" +
                "Son activité a porté l'institution au sixième rang des musées régionaux en 1948.<br />" +
                "A La Rochelle, il est le premier conservateur à traiter de l'histoire de l'homme d'un point de vue biologique et culturel. Il donne au musée une dimension pédagogique en l'ouvrant à un large public notamment scolaire."
            );
            var sign18 = Object.create(Sign);
            sign18.init(
                "images/sign_18.png",
                "Post-Scientific Explorations<br />" +
                "<br />" +
                "Some often interesting goals",
                "The ethnographic collections gathered by Etienne Loppe during the first half of the 19th century were reported by the adventurers, explorers, missionaries, militaries, entrepreneurs or again diplomats, some of which were actors in colonial conquests during the second half of the 19th century.<br />" +
                "At the beginning of the 20th century, ethnologists like Alfred Buhler, in turn, invested in the field. <br />" +
                "The diverse process of collecting and those of selected objects witnessed the specific goals and the personal awareness of each collector.",
                "Après les explorations scientifiques<br />" +
                "<br />" +
                "Des objectifs souvent intéressés",
                "Les collections ethnographiques rassemblées par Etienne Loppé au cours de la première moitié du XIXe siècle ont été rapportées par des aventuriers, des explorateurs, des missionnaires, des militaires, des entrepreneurs ou encore des diplomates dont certains furent les acteurs des conquêtes coloniales au cours de la seconde moitié du XIXe siècle.<br />" +
                "Au début du XXe siècle, les ethnologues, comme Alfred Bühler, investissent à leur tour le terrain.<br />" +
                "La diversité des processus de collecte et celle des objets sélectionnés témoignent des objectifs spécifiques et de la sensibilité personnelle de chaque collectionneur."
            );
            var sign19 = Object.create(Sign);
            sign19.init(
                "images/sign_19.png",
                "Stages of Western Recognition<br />" +
                "<br />" +
                "From Distant Point of View to Shared View",
                "The conscience of others is not a Western exclusivity in the modern times. All people are defined in relation to the Other, as in the Ancient times, the Greek called those who did not speak their language as Barbarian. While, in the 18th century, the concept of alien did not exist in the Polynesians, and considered that those who came as gods. <br />" +
                "Nonetheless, it is the European feature to include the observation of these “Others” into science, anthropology and literary science of human.<br />" +
                "The first observations of type ethnology were done by Herodotus, a Greek historian in circa 484-425 BC. However, the reflection on the Other only developed in the West in the 15th and 16th century when the discovery of the New World posed a question on where the Indians belonged in humanity. <br />" +
                "Today, anthropology invests in all sectors, both Western and non-Western associations (economy, spiritual and politics). <br />" +
                "On the other hand, it attempts to apprehend the cultural phenomenon as a whole both at the moment and during its evolution in time.",
                "Les étapes du regard occidental<br />" +
                "<br />" +
                "Du regard éloigné au regard partagé",
                "La conscience de l'autre n'est pas une exclusivité occidentale des Temps modernes. Tous les peuples se définissent par rapport à un Autre, ainsi dans l'Antiquité, les Grecs nomment Barbare celui qui ne parle pas leur langue, alors qu'au XVIIIe siècle les Polynésiens ne connaissent pas  la notion d'étranger et considèrent tous ceux qui arrivent comme des dieux.<br />" +
                "Mais, la particularité de l'Europe est d'avoir voulu ériger l'observation de l'autre en science, l'anthropologie, littéralement science de l'homme.<br />" +
                "Les premières observations de type enthnologique remontent à Hérodote, historien grec vers 484-425 avant J. C. Cependant, la réflexion sur l'autre se développe en Occident aux XVe et XVIe siècles lorsque la découverte du Nouveau Monde pose la question de l'appartenance des Indiens à l'humanité.<br />" +
                "Aujourd'hui, l'anthropologie investit tous les secteurs des sociétés occidentales et non-occidentales (l'économique, le sacré, le politique).<br />" +
                "En outre, elle tente d'appréhender l'ensemble des phénomènes culturels aussi bien dans l'instant que dans leur évolution temporelle."
            );
            var sign20 = Object.create(Sign);
            sign20.init(
                "images/sign_20.png",
                "African Pre-History and Early History<br />" +
                "<br />" +
                "History of the Pre-History",
                "Before 1914, African history was understood only from the ruins of the great civilizations like Egyptians, Nubians, Ethiopians and Carthaginians. No one found traces of ancient buildings in the rest of the continent, only some daily objects considered bringing no history behind.<br />" +
                "<br />" +
                "Nonetheless, around the mission, several colony administrators gathered series of objects dated back to prehistorical era, which then became personal collections or museums’ property. During those eras, the ancient periods were represented only by tools, such as hand axe, choppers or Mousterian stone tools and arrowhead, knives and blade saws.",
                "Préhistoire et protohistoire africaines<br />" +
                "<br />" +
                "Histoire de la préhistoire",
                "Avant 1914, l'histoire de l'Afrique n'est appréhendée qu'à travers les vestiges des grandes civilisations égyptienne, nubienne, éthiopienne et carthaginoise. On ne trouve pas, dans le reste du continent, de traces d'édifices anciens mais plutôt des objets quotidiens considérés comme n'ayant pas eu d'histoire.<br />" +
                "<br />" +
                "Néanmoins, au détour de leur mission, quelques administrateurs coloniaux rassemblent des séries d'objets datant de la préhistoire qui entrent dans les collections privées ou les musées. A leur époque, les périodes anciennes ne sont représentées que par des outils comme des bifaces, des hachereaux ou des pointes moustériennes et des armatures de flèche, des couteaux, des couteaux-scies."
            );
            var sign21 = Object.create(Sign);
            sign21.init(
                "images/sign_21.png",
                "African Metallurgy<br />" +
                "<br />" +
                "A Local and Ancient Invention",
                "African-origin metallurgy exists as shown by numerous archeological traces found in South Sahara. <br />" +
                "In Tunisia, the evidence dated far back up to 6th century BC, while the metal crafts found in Niger were dated back between 1.500 and 2.500 years BC. In Cameroon, this activity has already existed around before 1.200 years BC. It is also well known that Sub Saharan Africans has been supplying the metals to the Egyptians pharaohs.<br />" +
                "<br />" +
                "During the era of the Black Trafficking, there had been some reduction on the importation of iron leading to reduction of production, which further decreased the prestige of blacksmith.<br />" +
                "<br />" +
                "Nowadays, the metal handwork has lost its traditional form added by recuperation of metals. Sometimes, some creations of miniature traditional sceneries and objects on recycled metals are made for tourists.",
                "La métallurgie africaine<br />" +
                "<br />" +
                "Une invention locale et ancienne",
                "Il existe bien une métallurgie d'origine africaine comme l'attestent de nombreuses traces archéologiques découvertes au sud du Sahara.<br />" +
                "En Tunisie, les témoignages les plus anciens remontent au VIe siècle avant J.-C. alors que les objets en fer retrouvés au Niger ont été datés entre 1500 et 2500 avant J.-C. Au Cameroune, cette activité existait déjà aux alentours de 1200 avant J.-C. On sait aussi que l'Afrique subsaharienne fournissait en métal les pharaons égyptiens.<br />" +
                "<br />" +
                "A l'époque de la traite des Noirs, les importations de fer entraînent une réduction de la production ce qui diminue le prestige du forgeron-fondeur.<br />" +
                "<br />" +
                "Aujourd'hui, le travail artisanal du métal perdure sous sa forme traditionnelle à laquelle s'est ajoutée la récupération de métaux. Elle produit parfois aussi, pour une clientèle touristique, des scènes traditionnelles en miniature et des objets en métal recyclé."
            );
            var sign22 = Object.create(Sign);
            sign22.init(
                "images/sign_22.png",
                "Ornament Set and Social Status Sign<br />" +
                "<br />" +
                "Ornament Set and Social Status",
                "If clothes possess protective and decorative functions, ornament is an instrument primarily symbolic. Permanent marks like tattoos and scarification or accessories (for example headgears, jewelries and scepter) signify the appearance of a group, a gender, class of age and mark the social rank. <br />" +
                "The decryption of these objects-signs opens the access to understand the idea of political, juridical and religious values of a society. <br />" +
                "<br />" +
                "The outfits and badges displayed refer to certain number of social organizations in Oceania, Africa and South America. This will allow sketching a decryption upon the contemporary phenomenon linked to the exercise of power.",
                "Parures et signes de l'ordre social<br />" +
                "<br />" +
                "Parure et statut social",
                "Si le vêtement a des fonctions protectrice et décorative, la parure est un instrument avant tout symbolique. Les marques permanentes comme les tatouages et les scarifications ou les accessoires tels les coiffes, bijoux et sceptres signifient l'appartenance à un groupe, à un sexe, à une classe d'âge et marquent le rang social.<br />" +
                "Le déchiffrage de ces objets-signes donne accès aux valeurs politiques, juridiques, religieuses d'une société.<br />" +
                "<br />" +
                "Les panoplies et insignes présentés font référence à un certain nombre d'organisations sociales d'Océanie, d'Afrique, d'Amérique du Sud. Ceci permet d'esquisser un décryptage de phénomènes contemporains liés à l'exercice du pouvoir."
            );
            var sign23 = Object.create(Sign);
            sign23.init(
                "images/sign_23.png",
                "Decorative Arts outside Europe<br />" +
                "<br />" +
                "From Judgement to Consideration",
                "People have been judging that objects belonging to people outside Europe were having some sort of “savagery” treatments from their makers. It was not until during 19th century that a lot of artists and arts lovers began to appreciate those objects for their esthetical qualities. <br />" +
                "<br />" +
                "The form of the object is resulted from the ideal implementation between materials, means of action and functional purposes.<br />" +
                "The process integrates other considerations as well, particularly the esthetic aspect referring to a symbolic universe. The decoration is then considered a language of signs.",
                "Arts décoratifs extra-européens<br />" +
                "<br />" +
                "Du jugement à la considération",
                "On a longtemps jugé que les objets des populations extra-européennes exprimaient la \"sauvagerie\" de leurs auteurs. C'est au moins au cours du XIXe siècle que de nombreux artistes et amateurs d'art les ont appréciés pour leurs qualités esthétiques.<br />" +
                "<br />" +
                "La forme de l'objet résulte de la mise en oeuvre d'une formule idéale entre matière, moyens d'action et objectif fonctionnel.<br />" +
                "Le processus intègre d'autres considérations notamment esthétiques qui renvoient à un univers symbolique. L'ornementation doit donc être considérée comme un langage de signes."
            );
            var sign24 = Object.create(Sign);
            sign24.init(
                "images/sign_24.png",
                "Musical Arts<br />" +
                "<br />" +
                "Exceeding the human condition",
                "Each society decided which sound objects relevant to the category of musical instruments.<br />" +
                "Daily objects, such as mortar and pestle are then included as percussions.<br />" +
                "Several objects are found, for example, in the nature, some are fabricated; all accentuate the lives of mankind and their spiritual quest since the beginning of time.<br />" +
                "The instruments become the means of communication within a group, with the rest of the world, even with the ones out there. As the mediator between people and their ancestors, spirit and other divinities, it goes beyond \"human condition\".",
                "Les arts musicaux<br />" +
                "<br />" +
                "Transcender la condition humaine",
                "Chaque société détermine quels objets sonores relèvent de la catégorie des instruments de musique.<br />" +
                "Des objets usuels, tels le pilon et le mortier, se voient ainsi promus instruments à percussions.<br />" +
                "Certains ont été trouvés tels quels dans la nature, d'autres fabriqués, tous rythmant, depuis la nuit des temps, la vie des hommes et accompagnant leurs quêtes spirituelles.<br />" +
                "L'instrument permet la communication au sein du groupe, avec le reste du monde et même avec l'au-delà. Médiateur entre les hommes et les ancêtres, esprits et autres divinités, il transcende \"la condition humaine\"."
            );
            var sign25 = Object.create(Sign);
            sign25.init(
                "images/sign_25.png",
                "Beyond the sacred, universal<br />" +
                "<br />" +
                "Nature Interpreter",
                "A lot of non-Western societies consider that humans are not the central element of the Universe; rather, it is the permanent exchanges between the natural and supernatural worlds. <br />" +
                "Henceforth, there is no human activities can be considered without taking its sacred dimension into account. <br />" +
                "The society searches constantly the spirits and the ancestors who justify the existence of the group, and where it belongs in the world. <br />" +
                "The objects presented here must be considered as the expression of a sacred one, sometimes difficult for the Western observers to identify.",
                "Au-delà du sacré, l'universel<br />" +
                "<br />" +
                "Interpréter la nature",
                "Beaucoup de sociétés non occidentales ne considèrent pas l'homme comme l'élément central de l'univers mais croient à des échanges permanents entre les mondes naturel et surnaturel.<br />" +
                "Aucune activité humaine ne peut donc être envisagée sans prendre en compte sa dimension sacrée.<br />" +
                "La société sollicite constamment les esprits et les ancêtres qui justifient l'existence du groupe et son appartenance au monde.<br />" +
                "Les objets présentés ici doivent donc être considérés comme l'expression d'un sacré parfois difficile à cerner par des observateurs occidentaux."
            );
            var sign26 = Object.create(Sign);
            sign26.init(
                "images/sign_26.png",
                "Beyond the sacred, the universal<br />" +
                "<br />" +
                "A mediator, the American Shaman",
                "Shamanism is a religion for certain people in Siberia, western Mongolia and American people, characterized by the worship of nature, beliefs in spirits, practice of divination and traditional medication. <br />" +
                "The idea of shamanism appeared in Europe during the 18th century along with the discovery of religious practices in one of Siberian population.<br />" +
                "Nowadays, shamanism is considered to be the shaman practice as a whole, integrated hypnosis and fortune telling, or an ecstasy technique where an individual can enter into communication with the supernatural world by being in trance. The priest-sorcerer -sometimes soothsayer and therapist- is called a shaman; and he travels in the supernatural world, full with the sprits of nature where he goes mainly to seek for the strayed souls and return them to their bodies. With his knowledge on nature and spiritual powers, a shaman may also heal or harm. <br />" +
                "Despite being a specialist, a shaman remains integrated in the society and does not enjoy any special status.",
                "Au-delà du sacré, l'universel<br />" +
                "<br />" +
                "Un médiateur, le chaman aux Amériques",
                "Le chamanisme est la religion de certains peuples de Sibérie, de Mongolie occidentale et des Amériques, caractérisée par le culte de la nature, la croyance aux esprits et des pratiques divinatoires et thérapeutiques.<br />" +
                "La notion de chamanisme est apparue en Europe au cours du XVIIIe siècle avec la découverte des pratiques religieuses d'une population sibérienne.<br />" +
                "Aujourd'hui, on considère qu'il s'agit de l'ensemble des pratiques des chamans, intégrant l'hypnose et la sorcellerie ou d'une technique de l'extase grâce à laquelle un individu entre en communication avec le monde des esprits par la transe. Le prêtre-sorcier, à la fois devin et thérapeute, s'appelle le chaman et voyage dans un monde surnaturel peuplé d'esprits de la nature avec lesquels ils s'entretiennent notamment pour ramener les âmes errantes et les rendre à leur corps. Par sa connaissance de la nature et des forces surnaturelles, il peut donc faire le bien (guérir) mais aussi nuire.<br />" +
                "Bien que spécialiste, le chaman reste intégré dans la société et ne jouit pas d'un statut particulier."
            );

            var signs = [
                sign0,
                sign1,
                sign2,
                sign3,
                sign4,
                sign5,
                sign6,
                sign7,
                sign8,
                sign9,
                sign10,
                sign11,
                sign12,
                sign13,
                sign14,
                sign15,
                sign16,
                sign17,
                sign18,
                sign19,
                sign20,
                sign21,
                sign22,
                sign23,
                sign24,
                sign25,
                sign26];

            var signLogo = document.getElementById("logo_sign");
            signLogo.src = signs[signNumber].mLogo;

            var signTitle = document.getElementById("signTitle");
            var signContent = document.getElementById("signContent");
            switch (language) {
                case "french":
                    signTitle.innerHTML = signs[signNumber].mFrenchTitle;
                    signContent.innerHTML = signs[signNumber].mFrenchContent;
                    break;
                /*case "spanish":
                 signTitle.innerHTML = signs[signNumber].mSpanishTitle;
                 signContent.innerHTML = signs[signNumber].mSpanishContent;
                 break;
                 case "german":
                 signTitle.innerHTML = signs[signNumber].mGermanTitle;
                 signContent.innerHTML = signs[signNumber].mGermanContent;
                 break;*/
                default:
                    signTitle.innerHTML = signs[signNumber].mEnglishTitle;
                    signContent.innerHTML = signs[signNumber].mEnglishContent;
            }

            var p = document.getElementById("number");
            if (signNumber === 0) {
                p.innerHTML = "24bis";
            } else {
                p.innerHTML = signNumber;
            }

            if (signNumber === 1) {
                previous.style.visibility = "hidden";
            } else {
                previous.style.visibility = "visible";
            }

            var logo2 = document.getElementById("second_logo_sign");
            if (signNumber === 25) {
                logo2.style.visibility = "visible";
            } else {
                logo2.style.visibility = "hidden";
            }

            if (signNumber === 26) {
                next.style.visibility = "hidden";
            } else {
                next.style.visibility = "visible";
            }
        };
    }

    if (previous !== null) {
        previous.addEventListener('click', function () {
            switch (signNumber) {
                case 0:
                    signNumber = 24;
                    break;
                case 9:
                    signNumber = 7;
                    break;
                case 25:
                    signNumber = 0;
                    break;
                default:
                    signNumber--;
            }
            sessionStorage.setItem("signNumber", signNumber);
            document.location = "signs.html";
        });
    }

    if (next !== null) {
        next.addEventListener("click", function () {
            switch (signNumber) {
                case 0:
                    signNumber = 25;
                    break;
                case 7:
                    signNumber = 9;
                    break;
                case 24:
                    signNumber = 0;
                    break;
                default:
                    signNumber++;
            }
            sessionStorage.setItem("signNumber", signNumber);
            document.location = "signs.html";
        });
    }
})();