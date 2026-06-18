fetch('http://cms:3000/api/pages/1', { method: 'DELETE' }).then(() => {const data = {
  title: 'FÄąâ€oldal',
  slug: 'fooldal',
  seoTitle: 'Executive Insights - VezetÄąâ€i Coaching',
  seoDescription: 'PrÄ‚Â©mium vezetÄąâ€i coaching Ä‚Â©s mentorÄ‚Ë‡lÄ‚Ë‡s.',
  layout: [
    {
      blockType: 'hero',
      title: 'KivÄ‚Â©teles vezetÄąâ€k nem szÄ‚Ä˝letnek. Ä‚â€°pÄ‚Ä˝lnek.',
      description: 'SzemÄ‚Â©lyre szabott executive coaching Ä‚Â©s stratÄ‚Â©giai mentorÄ‚Ë‡lÄ‚Ë‡s azoknak, akik mÄ‚Ë‡r a csÄ‚Ĺźcson vannak Ă˘â‚¬â€ś vagy oda tartanak.',
      primaryCtaText: 'KezdjÄ‚Ä˝nk egy beszÄ‚Â©lgetÄ‚Â©st',
      primaryCtaLink: '#contact',
      secondaryCtaText: 'MÄ‚Ĺ‚dszertanunk',
      secondaryCtaLink: '/methodology',
    },
    {
      blockType: 'quoteSlider',
      items: [
        {
          icon: 'Award',
          tag: 'Elismerés',
          title: 'Top 10 Executive Coaching firm Közép-Európában - 2024',
          desc: 'Független szakmai díj a Coaching at Work magazintól.',
        },
        {
          icon: 'TrendingUp',
          tag: 'Adat',
          title: 'Vezetői NPS +78 az ügyfeleinknél',
          desc: '240+ kísért vezető válasza alapján - 2024 évzáró felmérés.',
        },
        {
          icon: 'Users',
          tag: 'Esemény',
          title: 'Leadership Insights Forum - 2025. március 14.',
          desc: 'Egynapos zártkörű esemény C-szintű vezetőknek Budapesten.',
        },
      ],
    },
    {
      blockType: 'services',
      eyebrow: '01 Ă˘â‚¬â€ť SzolgÄ‚Ë‡ltatÄ‚Ë‡sok',
      title: 'Miben tudunk<br/><span class="italic font-medium text-[#1A2A4F]/70">tÄ‚Ë‡mogatni?</span>',
      description: 'Tapasztalati alapÄ‚Ĺź megkÄ‚Â¶zelÄ‚Â­tÄ‚Â©sÄ‚Ä˝nk tÄ‚ĹźllÄ‚Â©p az elmÄ‚Â©leten. ValÄ‚Ĺ‚s Ä‚Ä˝zleti helyzetekre, valÄ‚Ĺ‚s vezetÄąâ€i kihÄ‚Â­vÄ‚Ë‡sokra fÄ‚Ĺ‚kuszÄ‚Ë‡lunk.',
      services: [
        {
          title: 'Executive Coaching',
          description: 'NÄ‚Â©gyszemkÄ‚Â¶zti, diszkrÄ‚Â©t partnersÄ‚Â©g C-szintÄąÂ± vezetÄąâ€knek. FÄ‚Ĺ‚kuszban a dÄ‚Â¶ntÄ‚Â©shozatal, a vezetÄąâ€i jelenlÄ‚Â©t Ä‚Â©s az izolÄ‚Ë‡ciÄ‚Ĺ‚ csÄ‚Â¶kkentÄ‚Â©se.',
          link: '/executive-coaching'
        },
        {
          title: 'Team Coaching & Board Alignment',
          description: 'VezetÄąâ€sÄ‚Â©gi csapatok Ä‚Â¶sszehangolÄ‚Ë‡sa, silÄ‚Ĺ‚k lebontÄ‚Ë‡sa Ä‚Â©s a kÄ‚Â¶zÄ‚Â¶s stratÄ‚Â©giai vÄ‚Â­ziÄ‚Ĺ‚ gyakorlatba Ä‚Ä˝ltetÄ‚Â©se.',
          link: '/team-coaching'
        },
        {
          title: 'Leadership AkadÄ‚Â©mia',
          description: 'KÄ‚Â¶zÄ‚Â©pvezetÄąâ€k felkÄ‚Â©szÄ‚Â­tÄ‚Â©se a felsÄąâ€vezetÄąâ€i szerepre. IntenzÄ‚Â­v, gyakorlatias Ä‚Â©s azonnal alkalmazhatÄ‚Ĺ‚ tudÄ‚Ë‡s.',
          link: '/leadership'
        },
        {
          title: 'StratÄ‚Â©giai MÄąÂ±hely',
          description: '1-2 napos offsite fÄ‚Ĺ‚kuszÄ‚Ë‡lt stratÄ‚Â©giaalkotÄ‚Ë‡shoz, kritikus problÄ‚Â©mÄ‚Ë‡k feloldÄ‚Ë‡sÄ‚Ë‡hoz, tapasztalt facilitÄ‚Ë‡lÄ‚Ë‡ssal.',
          link: '/strategy'
        }
      ]
    },
    {
      blockType: 'about',
      variant: 'warm',
      eyebrow: '02 Ă˘â‚¬â€ť RÄ‚Ĺ‚lunk',
      title: '12 Ä‚Â©v, 240+ vezetÄąâ€,<br/><span class="italic font-medium">egyetlen kÄ‚Ä˝ldetÄ‚Â©s.</span>',
      description: 'Nem vagyunk teoretikusok. Csapatunk minden tagja Ä‚Ä˝lt mÄ‚Ë‡r abban a szÄ‚Â©kben, amiben te. IsmerjÄ‚Ä˝k a nyomÄ‚Ë‡st, a felelÄąâ€ssÄ‚Â©get Ä‚Â©s a magÄ‚Ë‡nyt a csÄ‚Ĺźcson. AzÄ‚Â©rt hoztuk lÄ‚Â©tre az Executive Insights-ot, hogy az a partner lehessÄ‚Ä˝nk, akit mi magunk is kerestÄ‚Ä˝nk korÄ‚Ë‡bban.',
      bullets: [
        { text: 'KorÄ‚Ë‡bbi C-szintÄąÂ± tapasztalat' },
        { text: 'MÄ‚Â©rhetÄąâ€ Ä‚Ä˝zleti eredmÄ‚Â©nyek' },
        { text: 'AbszolÄ‚Ĺźt diszkrÄ‚Â©ciÄ‚Ĺ‚ Ä‚Â©s transzparencia' }
      ],
      floatingCardTitle: 'VezetÄąâ€i NPS 2024',
      floatingCardValue: '+78',
      ctaText: 'A csapat',
      ctaLink: '/rolunk'
    },
    {
      blockType: 'methodology',
      variant: 'cream',
      eyebrow: '03 Ă˘â‚¬â€ť MÄ‚Ĺ‚dszertan',
      title: 'A mi <span class="italic font-medium">megkÄ‚Â¶zelÄ‚Â­tÄ‚Â©sÄ‚Ä˝nk.</span>',
      description: 'Nincsenek sablonok. Minden folyamat egy mÄ‚Â©ly diagnÄ‚Ĺ‚zissal indul, Ä‚Â©s a te egyedi kontextusodra Ä‚Â©pÄ‚Ä˝l.',
      steps: [
        {
          number: '01',
          title: 'DiagnÄ‚Ĺ‚zis Ä‚Â©s 360Ă‚Â° Insight',
          description: 'FeltÄ‚Â©rkÄ‚Â©pezzÄ‚Ä˝k a jelenlegi helyzetet, az egyÄ‚Â©ni Ä‚Â©s szervezeti dinamikÄ‚Ë‡kat. Nem csak tÄ‚Â©ged, de a kÄ‚Â¶rnyezetedet is megÄ‚Â©rtjÄ‚Ä˝k.'
        },
        {
          number: '02',
          title: 'FÄ‚Ĺ‚kusz kijelÄ‚Â¶lÄ‚Â©se',
          description: 'AzonosÄ‚Â­tjuk azt az 1-2 kritikus terÄ‚Ä˝letet, ami a legnagyobb Ä‚Ë‡ttÄ‚Â¶rÄ‚Â©st hozhatja. A kevesebb itt tÄ‚Â¶bb.'
        },
        {
          number: '03',
          title: 'IntenzÄ‚Â­v partnersÄ‚Â©g',
          description: 'KÄ‚Â©theti rendszeres, mÄ‚Â©ly beszÄ‚Â©lgetÄ‚Â©sek. Nem tanÄ‚Ë‡csot adunk, hanem tÄ‚Ä˝krÄ‚Â¶t tartunk Ä‚Â©s provokÄ‚Ë‡ljuk a gondolkodÄ‚Ë‡sod.'
        },
        {
          number: '04',
          title: 'MÄ‚Â©rÄ‚Â©s Ä‚Â©s kalibrÄ‚Ë‡ciÄ‚Ĺ‚',
          description: 'Folyamatosan visszamÄ‚Â©rjÄ‚Ä˝k az eredmÄ‚Â©nyeket, mind Ä‚Â¶nÄ‚Â©rtÄ‚Â©kelÄ‚Â©s, mind a stakeholderek visszajelzÄ‚Â©sei alapjÄ‚Ë‡n.'
        }
      ]
    },
    {
      blockType: 'testimonials',
      variant: 'dark',
      eyebrow: '04 Ă˘â‚¬â€ť VisszajelzÄ‚Â©sek',
      title: 'Amit a partnereink<br/><span class="italic font-medium text-[#FFF2EF]/80">mondanak rÄ‚Ĺ‚lunk.</span>',
      testimonials: [
        {
          quote: "A legnagyobb Ä‚Â©rtÄ‚Â©k szÄ‚Ë‡momra, hogy valakivel teljesen nyÄ‚Â­ltan, politikai jÄ‚Ë‡tszmÄ‚Ë‡k nÄ‚Â©lkÄ‚Ä˝l tudom Ä‚Ë‡tbeszÄ‚Â©lni a legnehezebb dÄ‚Â¶ntÄ‚Â©seimet. Az elmÄ‚Ĺźlt Ä‚Â©vben nem csak jobb vezetÄąâ€, de nyugodtabb ember is lettem.",
          name: "TÄ‚Ĺ‚th GÄ‚Ë‡bor",
          position: "CEO, TechInnovate Kft."
        },
        {
          quote: "Amikor a menedzsment csapatunk elakadt, Äąâ€k nem egy Ä‚Ĺźjabb 'csapatÄ‚Â©pÄ‚Â­tÄąâ€t' hoztak. KÄąâ€kemÄ‚Â©ny tÄ‚Ä˝krÄ‚Â¶t kaptunk, ami fÄ‚Ë‡jt, de elindÄ‚Â­totta azt a vÄ‚Ë‡ltozÄ‚Ë‡st, ami nÄ‚Â©lkÄ‚Ä˝l ma nem lennÄ‚Â©nk piacvezetÄąâ€k.",
          name: "KovÄ‚Ë‡cs Anna",
          position: "HR IgazgatÄ‚Ĺ‚, GlobalLogistics"
        },
        {
          quote: "PrecÄ‚Â­z, Ä‚Ä˝zleti fÄ‚Ĺ‚kuszÄ‚Ĺź Ä‚Â©s sallangmentes. Pontosan ezt vÄ‚Ë‡rom el egy prÄ‚Â©mium szolgÄ‚Ë‡ltatÄ‚Ĺ‚tÄ‚Ĺ‚l. A velÄ‚Ä˝k valÄ‚Ĺ‚ munka a legjobb befektetÄ‚Â©s volt a karrierembe.",
          name: "SzabÄ‚Ĺ‚ PÄ‚Â©ter",
          position: "CFO, FinServ Bank"
        }
      ],
      stats: [
        { label: "Sikeres folyamat", value: "240+" },
        { label: "VisszatÄ‚Â©rÄąâ€ Ä‚Ä˝gyfÄ‚Â©l", value: "85%" },
        { label: "Ä‚Âtlagos egyÄ‚Ä˝ttmÄąÂ±kÄ‚Â¶dÄ‚Â©s", value: "18 hÄ‚Ĺ‚" }
      ]
    },
    {
      blockType: 'contact',
      variant: 'cream',
      eyebrow: '05 Ă˘â‚¬â€ť Kapcsolat',
      title: 'BeszÄ‚Â©ljÄ‚Ä˝nk.<br/><span class="italic font-medium text-[#1A2A4F]/70">DiszkrÄ‚Â©ten.</span>',
      description: 'Egy 30 perces, kÄ‚Â¶telezettsÄ‚Â©g nÄ‚Â©lkÄ‚Ä˝li konzultÄ‚Ë‡ciÄ‚Ĺ‚. MegnÄ‚Â©zzÄ‚Ä˝k a kontextust, Ä‚Â©s eldÄ‚Â¶ntjÄ‚Ä˝k egyÄ‚Ä˝tt, van-e Ä‚Â©rtelme tovÄ‚Ë‡bb menni.',
      contactInfo: [
        { icon: 'Mail', label: 'E-mail', value: 'hello@executiveinsights.hu' },
        { icon: 'Phone', label: 'Telefon', value: '+36 1 234 5678' },
        { icon: 'MapPin', label: 'Iroda', value: 'Budapest, Bajcsy-Zsilinszky Ä‚Ĺźt 12.' }
      ]
    }
  ]
};

fetch('http://cms:3000/api/pages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(json => console.log(JSON.stringify(json, null, 2)))
.catch(err => console.error(err));
});
