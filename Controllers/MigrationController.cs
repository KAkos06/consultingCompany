using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using System;

namespace ExecutiveInsightsUmbraco.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MigrationController : ControllerBase
    {
        private readonly IContentService _contentService;

        public MigrationController(IContentService contentService)
        {
            _contentService = contentService;
        }

        [HttpGet("run")]
        public IActionResult RunMigration()
        {
            var homeNode = _contentService.GetById(new Guid("3f707442-9abc-4677-b69a-b0ce9a0a8d9a"));
            if (homeNode == null) return NotFound("Home node not found");

            var fullGridJson = """
            {
              "layout": {
                "Umbraco.BlockGrid": [
                  {
                    "contentUdi": "umb://element/10000000000000000000000000000001",
                    "areas": [
                      {
                        "key": "c1111111-1111-1111-1111-111111111111",
                        "items": [
                          { "contentUdi": "umb://element/20000000000000000000000000000001", "areas": [], "columnSpan": 12, "rowSpan": 1 }
                        ]
                      }
                    ],
                    "columnSpan": 12,
                    "rowSpan": 1
                  },
                  {
                    "contentUdi": "umb://element/10000000000000000000000000000002",
                    "areas": [
                      {
                        "key": "c1111111-1111-1111-1111-111111111111",
                        "items": [
                          { "contentUdi": "umb://element/20000000000000000000000000000002", "areas": [], "columnSpan": 12, "rowSpan": 1 }
                        ]
                      }
                    ],
                    "columnSpan": 12,
                    "rowSpan": 1
                  },
                  {
                    "contentUdi": "umb://element/10000000000000000000000000000003",
                    "areas": [
                      {
                        "key": "c1111111-1111-1111-1111-111111111111",
                        "items": [
                          { "contentUdi": "umb://element/20000000000000000000000000000003", "areas": [], "columnSpan": 12, "rowSpan": 1 }
                        ]
                      }
                    ],
                    "columnSpan": 12,
                    "rowSpan": 1
                  },
                  {
                    "contentUdi": "umb://element/10000000000000000000000000000004",
                    "areas": [
                      {
                        "key": "c1111111-1111-1111-1111-111111111111",
                        "items": [
                          { "contentUdi": "umb://element/20000000000000000000000000000004", "areas": [], "columnSpan": 12, "rowSpan": 1 }
                        ]
                      }
                    ],
                    "columnSpan": 12,
                    "rowSpan": 1
                  },
                  {
                    "contentUdi": "umb://element/10000000000000000000000000000005",
                    "areas": [
                      {
                        "key": "c1111111-1111-1111-1111-111111111111",
                        "items": [
                          { "contentUdi": "umb://element/20000000000000000000000000000005", "areas": [], "columnSpan": 12, "rowSpan": 1 }
                        ]
                      }
                    ],
                    "columnSpan": 12,
                    "rowSpan": 1
                  },
                  {
                    "contentUdi": "umb://element/10000000000000000000000000000006",
                    "areas": [
                      {
                        "key": "c1111111-1111-1111-1111-111111111111",
                        "items": [
                          { "contentUdi": "umb://element/20000000000000000000000000000006", "areas": [], "columnSpan": 12, "rowSpan": 1 }
                        ]
                      }
                    ],
                    "columnSpan": 12,
                    "rowSpan": 1
                  },
                  {
                    "contentUdi": "umb://element/10000000000000000000000000000007",
                    "areas": [
                      {
                        "key": "c1111111-1111-1111-1111-111111111111",
                        "items": [
                          { "contentUdi": "umb://element/20000000000000000000000000000007", "areas": [], "columnSpan": 12, "rowSpan": 1 }
                        ]
                      }
                    ],
                    "columnSpan": 12,
                    "rowSpan": 1
                  },
                  {
                    "contentUdi": "umb://element/10000000000000000000000000000008",
                    "areas": [
                      {
                        "key": "c1111111-1111-1111-1111-111111111111",
                        "items": [
                          { "contentUdi": "umb://element/20000000000000000000000000000008", "areas": [], "columnSpan": 12, "rowSpan": 1 }
                        ]
                      }
                    ],
                    "columnSpan": 12,
                    "rowSpan": 1
                  }
                ]
              },
              "contentData": [
                { "contentTypeKey": "a1111111-1111-1111-1111-111111111111", "udi": "umb://element/10000000000000000000000000000001", "padding": "normal", "backgroundColor": "cream" },
                { "contentTypeKey": "a1111111-1111-1111-1111-111111111111", "udi": "umb://element/10000000000000000000000000000002", "padding": "small", "backgroundColor": "cream" },
                { "contentTypeKey": "a1111111-1111-1111-1111-111111111111", "udi": "umb://element/10000000000000000000000000000003", "padding": "normal", "backgroundColor": "cream" },
                { "contentTypeKey": "a1111111-1111-1111-1111-111111111111", "udi": "umb://element/10000000000000000000000000000004", "padding": "normal", "backgroundColor": "white" },
                { "contentTypeKey": "a1111111-1111-1111-1111-111111111111", "udi": "umb://element/10000000000000000000000000000005", "padding": "normal", "backgroundColor": "cream" },
                { "contentTypeKey": "a1111111-1111-1111-1111-111111111111", "udi": "umb://element/10000000000000000000000000000006", "padding": "normal", "backgroundColor": "white" },
                { "contentTypeKey": "a1111111-1111-1111-1111-111111111111", "udi": "umb://element/10000000000000000000000000000007", "padding": "normal", "backgroundColor": "navy" },
                { "contentTypeKey": "a1111111-1111-1111-1111-111111111111", "udi": "umb://element/10000000000000000000000000000008", "padding": "normal", "backgroundColor": "cream" },
                
                {
                  "contentTypeKey": "b1111111-1111-1111-1111-111111111111",
                  "udi": "umb://element/20000000000000000000000000000001",
                  "tag": "Vezetői coaching",
                  "title": "Vezetői döntések tisztábban, stratégia bátrabban.",
                  "subtitle": "Az Executive Insights tapasztalt mentorok hálózata, akik C-szintű vezetőket és vezetői csapatokat kísérnek a növekedés legkritikusabb pillanataiban.",
                  "primaryButtonText": "Foglalj diagnosztikát",
                  "primaryCtaLink": "#contact",
                  "secondaryCtaText": "Hogyan dolgozunk?",
                  "secondaryCtaLink": "#methodology",
                  "stat1Num": "12+",
                  "stat1Label": "év tapasztalat",
                  "stat2Num": "240+",
                  "stat2Label": "kísért vezető",
                  "stat3Num": "94%",
                  "stat3Label": "ismételt megbízás"
                },
                {
                  "contentTypeKey": "b5555555-5555-5555-5555-555555555555",
                  "udi": "umb://element/20000000000000000000000000000002",
                  "quote1Icon": "Quote",
                  "quote1Tag": "Vélemény",
                  "quote1Title": "9 hónap alatt megváltozott a felső csapatunk dinamikája.",
                  "quote1Desc": "Kovács Andrea - CEO, Nordwell Group",
                  "quote2Icon": "Award",
                  "quote2Tag": "Elismerés",
                  "quote2Title": "Top 10 Executive Coaching firm Közép-Európában - 2024",
                  "quote2Desc": "Független szakmai díj a Coaching at Work magazintól.",
                  "quote3Icon": "TrendingUp",
                  "quote3Tag": "Adat",
                  "quote3Title": "Vezetői NPS +78 az ügyfeleinknél",
                  "quote3Desc": "240+ kísért vezető válasza alapján - 2024 évzáró felmérés.",
                  "quote4Icon": "Users",
                  "quote4Tag": "Esemény",
                  "quote4Title": "Leadership Insights Forum - 2025. március 14.",
                  "quote4Desc": "Egynapos zártkörű esemény C-szintű vezetőknek Budapesten."
                },
                {
                  "contentTypeKey": "b3333333-3333-3333-3333-333333333333",
                  "udi": "umb://element/20000000000000000000000000000003",
                  "eyebrow": "Szolgáltatásaink",
                  "title": "Amiben a <span class=\"italic text-[#F7A5A5]\">legjobbak</span> vagyunk.",
                  "subtitle": "Nem kínálunk tucatmegoldásokat. Kizárólag olyan területeken vállalunk partnerséget, ahol a mentoraink több évtizedes személyes tapasztalata azonnali és mérhető értéket teremt.",
                  "service1Icon": "Vezetőknek",
                  "service1Title": "Executive Coaching",
                  "service1Desc": "Egyéni fókuszú, intenzív fejlesztés C-szintű vezetőknek, hogy a legnehezebb helyzetekben is magabiztosan döntsenek.",
                  "service2Icon": "Csapatoknak",
                  "service2Title": "Vezetőségi Mentorálás",
                  "service2Desc": "A menedzsment csapatok összehangolása, a közös stratégiai vízió kialakítása és a belső feszültségek feloldása.",
                  "service3Icon": "Szervezetnek",
                  "service3Title": "Stratégiai Tanácsadás",
                  "service3Desc": "Irányváltások, akvizíciók vagy krízishelyzetek objektív, külső szakértői támogatása és levezénylése."
                },
                {
                  "contentTypeKey": "b2222222-2222-2222-2222-222222222222",
                  "udi": "umb://element/20000000000000000000000000000004",
                  "tag": "02 - Rólunk",
                  "title": "12 év, 240+ vezető, egyetlen küldetés.",
                  "subtitle": "Az Executive Insights 2013-ban indult azzal a meggyőződéssel, hogy a legjobb vezetők sem dolgoznak egyedül. A magyar és közép-európai piac felső vezetőivel dolgozunk együtt diszkréten, mélyen és mérhető eredménnyel.",
                  "stat1Label": "Vezetői NPS 2024",
                  "stat1Value": "+78",
                  "ctaText": "Ismerj meg minket",
                  "ctaLink": "#contact",
                  "bullet1": "Diszkréció és feltétlen bizalom",
                  "bullet2": "Saját cégvezetői tapasztalat minden mentorunknál",
                  "bullet3": "Gyakorlatias, azonnal alkalmazható stratégiák",
                  "bullet4": "Kiterjedt, exkluzív kapcsolatrendszer"
                },
                {
                  "contentTypeKey": "b6666666-6666-6666-6666-666666666666",
                  "udi": "umb://element/20000000000000000000000000000005",
                  "eyebrow": "A folyamat",
                  "title": "Módszertan, ami a <span class=\"italic text-[#F7A5A5]\">gyakorlatban</span> is működik.",
                  "subtitle": "Nem hiszünk az elméleti, dobozos tréningekben. A mi megközelítésünk a valós kihívásokra és azonnali akciókra épül. A te tempódban, a te üzleti céljaidért.",
                  "step1Num": "01",
                  "step1Title": "Diagnosztika",
                  "step1Desc": "Első lépésként pontosan felmérjük a jelenlegi vezetői kihívásokat, elakadásokat és a célokat egy strukturált, 90 perces mélyinterjú során.",
                  "step2Num": "02",
                  "step2Title": "Közös Tervezés",
                  "step2Desc": "Kialakítunk egy teljesen egyénre vagy csapatra szabott roadmapet, fókuszálva a kritikus beavatkozási pontokra és a gyors győzelmekre (quick wins).",
                  "step3Num": "03",
                  "step3Title": "Implementáció",
                  "step3Desc": "Kéthetente találkozunk: szituációs elemzések, döntés-előkészítés és azonnali, gyakorlatias visszajelzések a valós napi problémákra.",
                  "step4Num": "04",
                  "step4Title": "Mérés & Korrekció",
                  "step4Desc": "Negyedévente visszamérjük az eredményeket a kitűzött KPI-ok alapján, és ha kell, finomhangoljuk az irányt.",
                  "bottomStripTitle": "Készen állsz a szintlépésre?",
                  "bottomStripDesc": "Kérj egy kötetlen, 30 perces egyeztetést, ahol megvizsgáljuk, miben tudunk a leggyorsabban segíteni.",
                  "bottomStripCtaText": "Időpontot foglalok",
                  "bottomStripCtaLink": "#contact"
                },
                {
                  "contentTypeKey": "b7777777-7777-7777-7777-777777777777",
                  "udi": "umb://element/20000000000000000000000000000006",
                  "eyebrow": "Visszajelzések",
                  "title": "Amit a <span class=\"italic text-[#F7A5A5]\">partnereink</span> mondanak.",
                  "subtitle": "Ügyfeleink nevét és cégét diszkréciós okokból nem mindig vállalhatjuk publikusan, de az eredményeik magukért beszélnek.",
                  "t1Quote": "Az Executive Insights csapata nem csak elméleti tanácsokat adott, hanem olyan gyakorlati megközelítést, amit azonnal be tudtam építeni a heti vezetői értekezletekbe. A csapatom dinamikája egy hónap alatt érezhetően javult.",
                  "t1Name": "Kovács Gábor",
                  "t1Role": "Vezérigazgató, TechLogistics Kft.",
                  "t2Quote": "Egy kritikus cégfelvásárlás közepén kerestem meg őket. A mentorom külső, higgadt nézőpontja nélkülözhetetlen volt ahhoz, hogy tisztán lássam a kockázatokat és ne csak az érzelmeim vezéreljenek a tárgyalásokon.",
                  "t2Name": "N. Andrea",
                  "t2Role": "Alapító-tulajdonos, Pénzügyi Szektor",
                  "stat1Number": "94%",
                  "stat1Label": "Ismételt megbízás",
                  "stat2Number": "25+",
                  "stat2Label": "Sikeres C-level váltás",
                  "stat3Number": "15M€+",
                  "stat3Label": "Ügyfél árbevétel növekedés",
                  "stat4Number": "0",
                  "stat4Label": "Megszegett titoktartás"
                },
                {
                  "contentTypeKey": "b0000000-0000-0000-0000-000000000000",
                  "udi": "umb://element/20000000000000000000000000000007",
                  "title": "Azonnali, mérhető értékteremtés a menedzsmentben.",
                  "primaryButtonText": "Kapcsolatfelvétel",
                  "primaryCtaLink": "#contact"
                },
                {
                  "contentTypeKey": "b8888888-8888-8888-8888-888888888888",
                  "udi": "umb://element/20000000000000000000000000000008",
                  "eyebrow": "Kapcsolat",
                  "title": "Kezdjük el a <span class=\"italic text-[#F7A5A5]\">közös munkát.</span>",
                  "subtitle": "Minden komoly elköteleződés egy nyílt beszélgetéssel kezdődik. Keress minket bizalommal!",
                  "description": "Irodánk Budapest szívében, diszkrét környezetben található. A megkereséseket 24 órán belül, teljes titoktartás mellett kezeljük.",
                  "c1Label": "Iroda",
                  "c1Value": "1051 Budapest, Széchenyi István tér 7-8.",
                  "c2Label": "Email",
                  "c2Value": "hello@executiveinsights.hu",
                  "c3Label": "Telefon",
                  "c3Value": "+36 1 234 5678"
                }
              ],
              "settingsData": []
            }
            """;

            homeNode.SetValue("bodyGrid", fullGridJson);
            _contentService.Save(homeNode);

            return Ok(new { message = "Migrated successfully with nested Layout Blocks", length = fullGridJson.Length });
        }
    }
}
