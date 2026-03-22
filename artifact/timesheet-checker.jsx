import { useState, useCallback, useMemo, useEffect } from "react";

// Config ingebakken vanuit GitHub (wimpierson/timesheet-checker/config/) — geen fetch nodig
const CONSULTANTS = [
  {naam:"Alexander Adriaensen",tia_naam:"Adriaensen Alexander",team:"Team 2",rol:"PM",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Ken Andries",tia_naam:"Andries Ken",team:"Team 3",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Koen Appeltans",tia_naam:"Appeltans Koen",team:null,rol:"PO",taal:"nl",type:"medewerker",vrijgesteld:true},
  {naam:"Tom Bauwens",tia_naam:"Bauwens Tom",team:null,rol:"PO",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Pieter Beckers",tia_naam:"Beckers Pieter",team:"Team 1",rol:"PM",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Kevin Bervoets",tia_naam:"Bervoets Kevin",team:"Team 5",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Tom Bevers",tia_naam:"Bevers Tom",team:"Consultants",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Art Boer",tia_naam:"Boer Art",team:"Team 3",rol:"DEV",taal:"nl",type:"contractor",vrijgesteld:true},
  {naam:"Bart Bollen",tia_naam:"Bollen Bart",team:"Team 1",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Filippe Bortels",tia_naam:"Bortels Filippe",team:"Consultants",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Anke Brouwer",tia_naam:"Brouwer Anke",team:"Consultants",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Siebe De Celle",tia_naam:"De Celle Siebe",team:"Team 2",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Giovanni De Gruyter",tia_naam:"De Gruyter Giovanni",team:"Team 3",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Nathalie De Martin",tia_naam:"De Martin Nathalie",team:null,rol:"MP",taal:"nl",type:"medewerker",vrijgesteld:true},
  {naam:"Paulien De Pauw",tia_naam:"De Pauw Paulien",team:null,rol:"PO",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Jo Dekelver",tia_naam:"Dekelver Jo",team:"Consultants",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Maxim Ganses",tia_naam:"Ganses Maxim",team:"Team 3",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Davy Goossens",tia_naam:"Goossens Davy",team:"Team 5",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Mirte Hamers",tia_naam:"Hamers Mirte",team:null,rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Glenn Janssens",tia_naam:"Janssens Glenn",team:"Team 5",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Jordy Janssens",tia_naam:"Janssens Jordy",team:"Team 3",rol:"PM",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Bona Kim",tia_naam:"Kim Bona",team:"Team 4",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Sandra Kotowska",tia_naam:"Kotowska Sandra",team:"Team 2",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Stijn Kuppens",tia_naam:"Kuppens Stijn",team:"Team 1",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Vicky Laurijssen",tia_naam:"Laurijssen Vicky",team:"Team 1",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Stef Liekens",tia_naam:"Liekens Stef",team:"Team 4",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Daniel Lozano",tia_naam:"Lozano Daniel",team:"Team 3",rol:"DEV",taal:"es",type:"medewerker",vrijgesteld:false},
  {naam:"Alejandro Lozano Morales",tia_naam:"Lozano Morales Alejandro",team:"Team 3",rol:"DEV",taal:"es",type:"medewerker",vrijgesteld:false},
  {naam:"Tymofii Maksymenko",tia_naam:"Maksymenko Tymofii",team:"Team 2",rol:"DEV",taal:"ua",type:"contractor",vrijgesteld:true},
  {naam:"Laurent Meganck",tia_naam:"Meganck Laurent",team:"Consultants",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Erik Michiels",tia_naam:"Michiels Erik",team:"Team 5",rol:"PM",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Javier Miguel Sauco",tia_naam:"Miguel Sauco Javier",team:"Team 2",rol:"DEV",taal:"es",type:"medewerker",vrijgesteld:false},
  {naam:"Christophe Neefs",tia_naam:"Neefs Christophe",team:"Consultants",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Mario Peeters",tia_naam:"Peeters Mario",team:null,rol:"PO",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Sandy Peeters",tia_naam:"Peeters Sandy",team:"Team 4",rol:"PM",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Wim Pierson",tia_naam:"Pierson Wim",team:null,rol:"MP",taal:"nl",type:"medewerker",vrijgesteld:true},
  {naam:"Olga Povitukhina",tia_naam:"Povitukhina Olga",team:"Consultants",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Joke Puts",tia_naam:"Puts Joke",team:null,rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Kenny Rassin",tia_naam:"Rassin Kenny",team:null,rol:"MP",taal:"nl",type:"medewerker",vrijgesteld:true},
  {naam:"Bart Reunes",tia_naam:"Reunes Bart",team:"Team 1",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Brent Robert",tia_naam:"Robert Brent",team:"Team 4",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Sven Roelandt",tia_naam:"Roelandt Sven",team:"Team 1",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Riansares Sels",tia_naam:"Sels Riansares",team:null,rol:"Sales",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Dmytro Shkoliar",tia_naam:"Shkoliar Dmytro",team:"Team 4",rol:"DEV",taal:"ua",type:"contractor",vrijgesteld:true},
  {naam:"Jeroen Smolders",tia_naam:"Smolders Jeroen",team:null,rol:"MP",taal:"nl",type:"medewerker",vrijgesteld:true},
  {naam:"Femke Steeman",tia_naam:"Steeman Femke",team:"Team 5",rol:"PO",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Karl Steinhauer",tia_naam:"Steinhauer Karl",team:null,rol:"PM",taal:"nl",type:"contractor",vrijgesteld:true},
  {naam:"Dylan Teugels",tia_naam:"Teugels Dylan",team:"Team 2",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Rick Van Boxstael",tia_naam:"Van Boxstael Rick",team:"Consultants",rol:"PO",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Matse Van Horebeek",tia_naam:"Van Horebeek Matse",team:null,rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Dieter Van Stijvendael",tia_naam:"Van Stijvendael Dieter",team:null,rol:"PO",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Arne Van den Langenbergh",tia_naam:"Van den Langenbergh Arne",team:"Team 3",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Elwyn Van der Borght",tia_naam:"Van der Borght Elwyn",team:"Team 5",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Sarah Van der Perren",tia_naam:"Van der Perren Sarah",team:null,rol:"PO",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Bert Vandermeulen",tia_naam:"Vandermeulen Bert",team:null,rol:"Sales",taal:"nl",type:"medewerker",vrijgesteld:true},
  {naam:"Jordy Vandewalle",tia_naam:"Vandewalle Jordy",team:null,rol:"PO",taal:"es",type:"medewerker",vrijgesteld:false},
  {naam:"Shauni Vansteyvoort",tia_naam:"Vansteyvoort Shauni",team:null,rol:"PO",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Bert Verbessem",tia_naam:"Verbessem Bert",team:null,rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Raul Verdugo Lorenzo",tia_naam:"Verdugo Lorenzo Raul",team:"Team 2",rol:"DEV",taal:"es",type:"medewerker",vrijgesteld:false},
  {naam:"Hans Vereyken",tia_naam:"Vereyken Hans",team:"Team 3",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Toon Verwerft",tia_naam:"Verwerft Toon",team:"Team 5",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Sarah Vrielinck",tia_naam:"Vrielinck Sarah",team:"Team 4",rol:"DEV",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Tom Vrolix",tia_naam:"Vrolix Tom",team:null,rol:"PM",taal:"nl",type:"medewerker",vrijgesteld:false},
  {naam:"Sergii Zheleznytskyi",tia_naam:"Zheleznytskyi Sergii",team:"Team 2",rol:"DEV",taal:"ua",type:"contractor",vrijgesteld:true},
];

const PROJECTEN = [
  {ord:"ORD07000",pm:"Erik Michiels"},{ord:"ORD10922",pm:"Tom Vrolix"},{ord:"ORD12482",pm:"Alexander Adriaensen"},{ord:"ORD13820",pm:"Tom Vrolix"},{ord:"ORD16505",pm:"Jordy Janssens"},{ord:"ORD16820",pm:"Erik Michiels"},{ord:"ORD16886",pm:"Jordy Janssens"},{ord:"ORD16943",pm:"Pieter Beckers"},{ord:"ORD20933",pm:"Jordy Janssens"},{ord:"ORD24613",pm:"Jordy Janssens"},{ord:"ORD25011",pm:"Alexander Adriaensen"},{ord:"ORD25809",pm:"Alexander Adriaensen"},{ord:"ORD26026",pm:"Alexander Adriaensen"},{ord:"ORD26157",pm:"Sandy Peeters"},{ord:"ORD26891",pm:"Pieter Beckers"},{ord:"ORD27016",pm:"Karl Steinhauer"},{ord:"ORD27166",pm:"Sandy Peeters"},{ord:"ORD27211",pm:"Sandy Peeters"},{ord:"ORD27224",pm:"Sandy Peeters"},{ord:"ORD27301",pm:"Sandy Peeters"},{ord:"ORD06470",pm:"Erik Michiels"},{ord:"ORD08848",pm:null},{ord:"ORD09574",pm:null},{ord:"ORD10063",pm:"Erik Michiels"},{ord:"ORD10457",pm:"Erik Michiels"},{ord:"ORD13926",pm:"Alexander Adriaensen"},{ord:"ORD14135",pm:"Alexander Adriaensen"},{ord:"ORD14137",pm:"Jordy Janssens"},{ord:"ORD14611",pm:"Jordy Janssens"},{ord:"ORD17126",pm:null},{ord:"ORD17446",pm:"Tom Vrolix"},{ord:"ORD18196",pm:"Tom Vrolix"},{ord:"ORD18328",pm:"Pieter Beckers"},{ord:"ORD27624",pm:"Pieter Beckers"},{ord:"ORD19525",pm:"Alexander Adriaensen"},{ord:"ORD19791",pm:"Sandy Peeters"},{ord:"ORD19819",pm:"Jordy Janssens"},{ord:"ORD20836",pm:null},{ord:"ORD21434",pm:null},{ord:"ORD23253",pm:"Jordy Janssens"},{ord:"ORD23905",pm:"Erik Michiels"},{ord:"ORD26027",pm:"Alexander Adriaensen"},{ord:"ORD27430",pm:"Jordy Janssens"},{ord:"ORD27535",pm:"Jordy Janssens"},{ord:"ORD10267",pm:"Wim Pierson"},{ord:"ORD12310",pm:"Wim Pierson"},{ord:"ORD13525",pm:"Wim Pierson"},{ord:"ORD05716",pm:null},{ord:"ORD07213",pm:null},{ord:"ORD07424",pm:null},{ord:"ORD07466",pm:"Tom Bauwens"},{ord:"ORD08557",pm:null},{ord:"ORD09403",pm:null},{ord:"ORD09486",pm:null},{ord:"ORD09597",pm:null},{ord:"ORD10392",pm:null},{ord:"ORD10450",pm:null},{ord:"ORD10763",pm:null},{ord:"ORD11441",pm:null},{ord:"ORD11590",pm:null},{ord:"ORD12374",pm:null},{ord:"ORD12967",pm:null},{ord:"ORD13124",pm:null},{ord:"ORD13302",pm:null},{ord:"ORD15059",pm:"Tom Bauwens"},{ord:"ORD15184",pm:"Jordy Janssens"},{ord:"ORD16503",pm:"Jordy Janssens"},{ord:"ORD16768",pm:null},{ord:"ORD16769",pm:null},{ord:"ORD18681",pm:"Alexander Adriaensen"},{ord:"ORD19548",pm:"Jordy Janssens"},{ord:"ORD19552",pm:"Alexander Adriaensen"},{ord:"ORD19557",pm:"Erik Michiels"},{ord:"ORD19558",pm:"Alexander Adriaensen"},{ord:"ORD19559",pm:"Alexander Adriaensen"},{ord:"ORD19560",pm:"Tom Vrolix"},{ord:"ORD19562",pm:"Tom Vrolix"},{ord:"ORD19563",pm:"Tom Vrolix"},{ord:"ORD19567",pm:"Sandy Peeters"},{ord:"ORD19818",pm:"Jordy Janssens"},{ord:"ORD19877",pm:null},{ord:"ORD20110",pm:"Tom Bauwens"},{ord:"ORD20286",pm:null},{ord:"ORD23254",pm:"Jordy Janssens"},{ord:"ORD23692",pm:null},{ord:"ORD23810",pm:null},{ord:"ORD24274",pm:"Jordy Janssens"},{ord:"ORD24275",pm:"Erik Michiels"},{ord:"ORD24511",pm:"Jordy Janssens"},{ord:"ORD24584",pm:"Jordy Janssens"},{ord:"ORD24612",pm:"Jordy Janssens"},{ord:"ORD24616",pm:"Jordy Janssens"},{ord:"ORD24619",pm:"Jordy Janssens"},{ord:"ORD24622",pm:"Jordy Janssens"},{ord:"ORD24626",pm:"Jordy Janssens"},{ord:"ORD25048",pm:null},{ord:"ORD25219",pm:"Erik Michiels"},{ord:"ORD25738",pm:null},{ord:"ORD25748",pm:"Erik Michiels"},{ord:"ORD25781",pm:"Jordy Janssens"},{ord:"ORD25913",pm:null},{ord:"ORD25945",pm:null},{ord:"ORD26033",pm:"Alexander Adriaensen"},{ord:"ORD26082",pm:"Nathalie De Martin"},{ord:"ORD26150",pm:null},{ord:"ORD26156",pm:"Sandy Peeters"},{ord:"ORD26343",pm:"Jordy Janssens"},{ord:"ORD26351",pm:"Jordy Janssens"},{ord:"ORD26705",pm:null},{ord:"ORD26750",pm:"Tom Bauwens"},{ord:"ORD26999",pm:"Sandy Peeters"},{ord:"ORD27063",pm:"Tom Bauwens"},{ord:"ORD27138",pm:"Alexander Adriaensen"},{ord:"ORD27165",pm:"Sandy Peeters"},{ord:"ORD27210",pm:"Sandy Peeters"},{ord:"ORD27300",pm:"Sandy Peeters"},{ord:"ORD27321",pm:null},
];

const BEHEERDERS = [
  {naam:"Wim Pierson",initials:"WP",functie:"Managing Partner",tia_naam:"Pierson Wim"},
  {naam:"Nathalie De Martin",initials:"ND",functie:"Managing Partner",tia_naam:"De Martin Nathalie"},
  {naam:"Jeroen Smolders",initials:"JS",functie:"Managing Partner",tia_naam:"Smolders Jeroen"},
  {naam:"Kenny Rassin",initials:"KR",functie:"Managing Partner",tia_naam:"Rassin Kenny"},
];

const STORAGE_KEY = "selected_user";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'IBM Plex Sans', sans-serif; background: #F5F4F0; }
  :root {
    --bg: #F5F4F0; --surface: #fff; --border: #E4E2DC;
    --text: #1A1917; --muted: #6B6965;
    --ok: #2D6A4F; --ok-bg: #D8F3DC; --ok-border: #95D5A8;
    --warn: #92400E; --warn-bg: #FEF3C7; --warn-border: #FCD34D;
    --error: #991B1B; --error-bg: #FEE2E2; --error-border: #FCA5A5;
    --info: #1E40AF; --info-bg: #DBEAFE; --info-border: #93C5FD;
    --contractor: #5B21B6; --contractor-bg: #EDE9FE; --contractor-border: #C4B5FD;
    --mono: 'IBM Plex Mono', monospace;
  }
  .app { min-height: 100vh; background: var(--bg); }
  .topbar { background: #1A1917; color: white; padding: 0 24px; display: flex; align-items: center; gap: 24px; height: 44px; }
  .topbar .logo { font-size: 13px; font-weight: 600; letter-spacing: 0.5px; }
  .topbar .page { font-size: 13px; color: rgba(255,255,255,0.9); }
  .topbar-spacer { flex: 1; }
  .topbar-user { font-size: 12px; color: rgba(255,255,255,0.55); display: flex; align-items: center; gap: 8px; }
  .topbar-user .avatar { width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; color: white; }
  .topbar-user .switch-btn { background: none; border: none; color: rgba(255,255,255,0.4); font-size: 11px; cursor: pointer; font-family: inherit; padding: 0; text-decoration: underline; }
  .topbar-user .switch-btn:hover { color: rgba(255,255,255,0.75); }
  .main { padding: 28px; }
  .center-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; }
  .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .month-nav { display: flex; align-items: center; gap: 10px; }
  .month-nav h1 { font-size: 20px; font-weight: 600; color: var(--text); }
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; border: none; cursor: pointer; font-family: inherit; }
  .btn-primary { background: #1A1917; color: white; }
  .btn-outline { background: var(--surface); color: var(--text); border: 1px solid var(--border); }
  .tabs { display: flex; gap: 2px; margin-bottom: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 4px; width: fit-content; }
  .tab { padding: 5px 14px; border-radius: 5px; font-size: 13px; font-weight: 500; cursor: pointer; color: var(--muted); border: none; background: transparent; font-family: inherit; }
  .tab.active { background: #1A1917; color: white; }
  .table { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .table-header { display: grid; grid-template-columns: 1fr 120px 150px 130px 100px 120px; padding: 10px 16px; background: var(--bg); border-bottom: 1px solid var(--border); gap: 8px; }
  .table-header span { font-size: 11px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; }
  .row { border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.1s; }
  .row:last-child { border-bottom: none; }
  .row:hover { background: #FAFAF8; }
  .row-inner { display: grid; grid-template-columns: 1fr 120px 150px 130px 100px 120px; padding: 11px 16px; align-items: center; gap: 8px; }
  .name-cell .name { font-size: 14px; font-weight: 500; color: var(--text); }
  .name-cell .sub { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .hours-cell { font-size: 13px; font-family: var(--mono); color: var(--text); }
  .progress-cell { display: flex; align-items: center; gap: 8px; }
  .progress-bar { flex: 1; height: 5px; border-radius: 3px; background: var(--border); overflow: hidden; max-width: 80px; }
  .progress-fill { height: 100%; border-radius: 3px; }
  .pf-ok { background: #22C55E; } .pf-warn { background: #F59E0B; } .pf-error { background: #EF4444; } .pf-contractor { background: #8B5CF6; }
  .progress-pct { font-size: 11px; font-family: var(--mono); color: var(--muted); }
  .missing-cell { font-size: 13px; font-family: var(--mono); color: var(--muted); }
  .missing-cell.bad { color: var(--error); font-weight: 600; }
  .att-cell { font-size: 13px; }
  .att-count { color: var(--warn); font-weight: 500; }
  .badge { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 5px; font-size: 11px; font-weight: 600; }
  .badge.compleet { background: var(--ok-bg); color: var(--ok); }
  .badge.aandacht { background: var(--ok-bg); color: var(--ok); }
  .badge.probleem { background: var(--error-bg); color: var(--error); }
  .badge.niet-afgesloten { background: var(--info-bg); color: var(--info); }
  .badge.contractor { background: var(--contractor-bg); color: var(--contractor); }
  .badge.nb-uren { background: var(--warn-bg); color: var(--warn); margin-left: 4px; }
  .badge.overuren { background: var(--warn-bg); color: var(--warn); margin-left: 4px; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 100; }
  .modal { background: var(--surface); border-radius: 12px; width: 580px; max-width: 95vw; box-shadow: 0 24px 64px rgba(0,0,0,0.22); }
  .modal-head { padding: 22px 24px 16px; display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 1px solid var(--border); }
  .modal-head h2 { font-size: 19px; font-weight: 600; color: var(--text); }
  .modal-head .sub { font-size: 12px; color: var(--muted); margin-top: 3px; }
  .modal-head .close { background: none; border: none; font-size: 22px; cursor: pointer; color: var(--muted); line-height: 1; padding: 0; }
  .modal-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; padding: 16px 24px; }
  .mstat { background: var(--bg); border-radius: 8px; padding: 12px 14px; }
  .mstat .lbl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted); margin-bottom: 4px; }
  .mstat .val { font-size: 24px; font-weight: 600; font-family: var(--mono); color: var(--text); }
  .mstat .val.warn { color: var(--warn); } .mstat .val.error { color: var(--error); }
  .modal-body { padding: 0 24px 20px; }
  .att-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--error); margin-bottom: 8px; }
  .alert { border-radius: 6px; padding: 10px 12px; font-size: 13px; margin-bottom: 6px; display: flex; gap: 8px; }
  .alert.warn { background: var(--warn-bg); color: var(--warn); border: 1px solid var(--warn-border); }
  .alert.error { background: var(--error-bg); color: var(--error); border: 1px solid var(--error-border); }
  .alert.ok { background: var(--ok-bg); color: var(--ok); border: 1px solid var(--ok-border); }
  .upload-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh; }
  .upload-card { background: var(--surface); border: 1.5px dashed var(--border); border-radius: 12px; padding: 48px 64px; text-align: center; cursor: pointer; max-width: 440px; width: 100%; }
  .upload-card:hover, .upload-card.drag { border-color: #1A1917; }
  .upload-icon { font-size: 36px; margin-bottom: 14px; }
  .upload-card h3 { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
  .upload-card p { font-size: 13px; color: var(--muted); }
  .ord-warn { background: var(--error-bg); border: 1px solid var(--error-border); border-radius: 8px; padding: 10px 16px; font-size: 12px; color: var(--error); margin-bottom: 14px; font-family: var(--mono); }
  .no-res { padding: 40px; text-align: center; color: var(--muted); font-size: 14px; }
  .role-grid { display: grid; grid-template-columns: repeat(2, 180px); gap: 12px; margin-top: 4px; }
  .role-card { background: var(--surface); border: 0.5px solid var(--border); border-radius: 10px; padding: 18px 20px; cursor: pointer; transition: border-color 0.15s; }
  .role-card:hover { border-color: #888; }
  .role-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--border); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: var(--muted); margin-bottom: 12px; }
  .role-naam { font-size: 14px; font-weight: 600; color: var(--text); }
  .role-functie { font-size: 11px; color: var(--muted); margin-top: 2px; }
`;

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(";").map(h => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map(line => {
    const vals = []; let cur = "", inQ = false;
    for (const c of line) {
      if (c === '"') inQ = !inQ;
      else if (c === ";" && !inQ) { vals.push(cur.trim()); cur = ""; }
      else cur += c;
    }
    vals.push(cur.trim());
    const obj = {};
    headers.forEach((h, i) => obj[h] = (vals[i]||"").replace(/^"|"$/g,"").trim());
    return obj;
  }).filter(r => r.Employee);
}

function parseHours(v) { return parseFloat((v||"").replace(",",".")) || 0; }
function parseDate(v) {
  if (!v) return null;
  if (v.includes("/")) { const [d,m,y] = v.split("/"); return new Date(+y,+m-1,+d); }
  const parts = v.split("-");
  if (parts.length === 3) return new Date(+parts[0], +parts[1]-1, +parts[2]);
  return new Date(v);
}
function iso(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function getWorkDays(y, m, hols) {
  const days = [], d = new Date(y, m-1, 1);
  while (d.getMonth() === m-1) {
    const localIso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (d.getDay()!==0 && d.getDay()!==6 && !hols.has(localIso)) days.push(localIso);
    d.setDate(d.getDate()+1);
  }
  return days;
}
function ordKey(code, desc) {
  const m = (code||"").match(/(ORD\d+)/i)||(desc||"").match(/(ORD\d+)/i);
  return m ? m[1].toUpperCase() : null;
}

function analyze(rows) {
  const cmap0 = {};
  CONSULTANTS.forEach(c => cmap0[c.tia_naam] = c);
  const holsByLang = {};
  rows.forEach(r => {
    if (r.TsCodeDescription !== "Feestdagen") return;
    const d = parseDate(r.WorkDate); if(!d) return;
    const lang = cmap0[r.Employee]?.taal || "nl";
    if (!holsByLang[lang]) holsByLang[lang] = new Set();
    holsByLang[lang].add(iso(d));
  });
  const hols = holsByLang["nl"] || new Set();
  const billable = new Set();
  rows.forEach(r => { if (r.IsBillable==="Billable") { const o=ordKey(r.TsCode,r.TsCodeDescription); if(o) billable.add(o); } });
  const allOrds = new Set();
  rows.forEach(r => { const o=ordKey(r.TsCode,r.TsCodeDescription); if(o) allOrds.add(o); });
  const projSet = new Set(PROJECTEN.map(p=>p.ord.toUpperCase()));
  const ordsZonderPM = [...allOrds].filter(o=>!projSet.has(o));
  const fd = parseDate(rows[0]?.WorkDate);
  const year = fd?.getFullYear()||new Date().getFullYear();
  const month = fd ? fd.getMonth()+1 : new Date().getMonth()+1;
  const workDays = getWorkDays(year, month, hols);
  const exp = workDays.length * 8;
  const byEmp = {};
  rows.forEach(r => { if(!byEmp[r.Employee]) byEmp[r.Employee]=[]; byEmp[r.Employee].push(r); });
  const results = [];
  for (const [emp, rs] of Object.entries(byEmp)) {
    const cfg = cmap0[emp]||null;
    const isContractor = cfg?.type==="contractor";
    const dm = {};
    rs.forEach(r => {
      const d=parseDate(r.WorkDate); if(!d) return;
      const i=iso(d);
      if(!dm[i]) dm[i]={hours:0,completed:false};
      dm[i].hours += parseHours(r.ActualHours);
      if(r.Completed==="Completed") dm[i].completed=true;
    });
    const total = Object.values(dm).reduce((s,d)=>s+d.hours,0);
    const missing = workDays.filter(d=>!dm[d]||dm[d].hours===0);
    const notClosed = workDays.filter(d=>dm[d]&&dm[d].hours>0&&!dm[d].completed);
    const partial = workDays.filter(d=>dm[d]&&dm[d].hours>0&&dm[d].hours<8);
    const over = Math.round(total*100)/100 > exp ? total-exp : 0;
    const empLang = cfg?.taal || "nl";
    const empHols = holsByLang[empLang] || new Set();
    const holWorked = [];
    rs.forEach(r => {
      const d=parseDate(r.WorkDate); if(!d) return;
      const i=iso(d);
      if(empHols.has(i)&&r.TsCodeDescription!=="Feestdagen"&&parseHours(r.ActualHours)>0&&!holWorked.includes(i)) holWorked.push(i);
    });
    const weekendWorked = [];
    rs.forEach(r => {
      const d=parseDate(r.WorkDate); if(!d) return;
      if(d.getDay()===0||d.getDay()===6) {
        const i=iso(d);
        if(parseHours(r.ActualHours)>0&&!weekendWorked.includes(i)) weekendWorked.push(i);
      }
    });
    const nbRows = rs.filter(r=>r.IsBillable!=="Billable"&&billable.has(ordKey(r.TsCode,r.TsCodeDescription)));
    const nbMap = {};
    nbRows.forEach(r=>{ const k=r.TsCodeDescription||"Onbekend"; if(!nbMap[k]) nbMap[k]=0; nbMap[k]+=parseHours(r.ActualHours); });
    const flags = [];
    if(notClosed.length>0) flags.push("NOT_CLOSED");
    if(missing.length>0) flags.push(isContractor?"OPEN_DAYS_CONTRACTOR":"OPEN_DAYS");
    if(over>0) flags.push("OVER_HOURS");
    if(partial.length>0&&missing.length===0&&total>=exp) flags.push("DAILY_VARIATION");
    if(holWorked.length>0) flags.push("HOLIDAY_WORKED");
    if(weekendWorked.length>0) flags.push("WEEKEND_WORKED");
    if(Object.keys(nbMap).length>0) flags.push("NB_ON_PROJECT");
    const seriousFlags = flags.filter(f=>f!=="DAILY_VARIATION"&&f!=="WEEKEND_WORKED"&&f!=="HOLIDAY_WORKED");
    let status="compleet";
    if(notClosed.length>0) status="niet-afgesloten";
    else if(missing.length>0&&isContractor) status="contractor";
    else if(missing.length>0) status="probleem";
    else if(seriousFlags.length>0) status="aandacht";
    results.push({employee:emp,config:cfg,total,exp,status,flags,missing,notClosed,partial,over,holWorked,weekendWorked,nbMap,att:flags.length,isContractor});
  }
  return {results,workDays,ordsZonderPM,month,year};
}

const MONTHS=["","Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"];
const SL={compleet:"✓ Compleet",aandacht:"✓ Compleet",probleem:"✗ Probleem","niet-afgesloten":"○ Niet afgesloten",contractor:"◇ Contractor"};

function Modal({r, onClose}) {
  useEffect(() => {
    const fn = e => e.key==="Escape"&&onClose();
    window.addEventListener("keydown",fn); return ()=>window.removeEventListener("keydown",fn);
  },[onClose]);
  const alerts = [];
  if(r.flags.includes("OVER_HOURS")) alerts.push({t:"warn",msg:`Meer uren dan voorzien (${r.total.toFixed(1)} > ${r.exp}u)`});
  if(r.flags.includes("HOLIDAY_WORKED")) alerts.push({t:"warn",msg:`Gelogd op feestdag: ${r.holWorked.join(", ")}`});
  if(r.flags.includes("DAILY_VARIATION")) alerts.push({t:"warn",msg:`Dagvariaties (< 8u): ${r.partial.join(", ")}`});
  if(r.flags.includes("NOT_CLOSED")) alerts.push({t:"error",msg:`Niet afgesloten: ${r.notClosed.length} dag(en) — ${r.notClosed.join(", ")}`});
  if(r.flags.includes("OPEN_DAYS")||r.flags.includes("OPEN_DAYS_CONTRACTOR")) alerts.push({t:"error",msg:`Ontbrekende dagen: ${r.missing.join(", ")}`});
  if(r.flags.includes("NB_ON_PROJECT")) alerts.push({t:"warn",msg:`NB-uren op klantproject: ${Object.entries(r.nbMap).map(([k,v])=>`${k} (${v.toFixed(1)}u)`).join(", ")}`});
  if(r.flags.includes("WEEKEND_WORKED")) alerts.push({t:"warn",msg:`Geboekt op weekend: ${(r.weekendWorked||[]).join(", ")}`});
  if(alerts.length===0) alerts.push({t:"ok",msg:"Geen aandachtspunten — tijdsheet volledig in orde."});
  return (
    <div className="modal-overlay" onClick={e=>e.target.className==="modal-overlay"&&onClose()}>
      <div className="modal">
        <div className="modal-head">
          <div><h2>{r.config?.naam||r.employee}</h2><div className="sub">{r.config?.team||"—"} · {r.config?.rol||"?"}{r.isContractor?" · contractor":""}</div></div>
          <button className="close" onClick={onClose}>×</button>
        </div>
        <div className="modal-stats">
          <div className="mstat"><div className="lbl">Totale uren</div><div className={`val${r.total<r.exp?" warn":""}`}>{r.total.toFixed(1)}/{r.exp}</div></div>
          <div className="mstat"><div className="lbl">Ontbrekend</div><div className={`val${r.missing.length>0?" error":""}`}>{r.missing.length}d</div></div>
          <div className="mstat"><div className="lbl">Niet afgesloten</div><div className={`val${r.notClosed.length>0?" warn":""}`}>{r.notClosed.length}d</div></div>
        </div>
        <div className="modal-body">
          {alerts[0].t!=="ok"&&<div className="att-title">Aandachtspunten</div>}
          {alerts.map((a,i)=><div key={i} className={`alert ${a.t}`}><span>{a.t==="ok"?"✓":"⚠"}</span><span>{a.msg}</span></div>)}
        </div>
      </div>
    </div>
  );
}

function RoleSelect({ onSelect }) {
  return (
    <div className="center-wrap">
      <div style={{textAlign:"center",marginBottom:24}}>
        <p style={{fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.8px",color:"var(--muted)",marginBottom:10}}>Toegang</p>
        <h2 style={{fontSize:20,fontWeight:600,color:"var(--text)",marginBottom:6}}>Wie ben jij?</h2>
        <p style={{fontSize:13,color:"var(--muted)"}}>Klik op je naam om verder te gaan</p>
      </div>
      <div className="role-grid">
        {BEHEERDERS.map(b => (
          <div key={b.naam} className="role-card" onClick={() => onSelect(b)}>
            <div className="role-avatar">{b.initials}</div>
            <div className="role-naam">{b.naam}</div>
            <div className="role-functie">{b.functie}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("loading");
  const [currentUser, setCurrentUser] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [tab, setTab] = useState("alle");
  const [modal, setModal] = useState(null);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const result = await window.storage.get(STORAGE_KEY);
        if (result?.value) {
          setCurrentUser(JSON.parse(result.value));
          setStep("upload");
        } else {
          setStep("select");
        }
      } catch {
        setStep("select");
      }
    }
    init();
  }, []);

  const handleSelect = useCallback(async (user) => {
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(user)); } catch {}
    setCurrentUser(user);
    setStep("upload");
  }, []);

  const handleSwitch = useCallback(async () => {
    try { await window.storage.delete(STORAGE_KEY); } catch {}
    setCurrentUser(null); setAnalysis(null); setStep("select");
  }, []);

  const handleFile = useCallback(file => {
    if (!file) return;
    const r = new FileReader();
    r.onload = e => {
      try {
        const rows = parseCSV(e.target.result);
        const result = analyze(rows);
        setAnalysis(result); setStep("results");
      } catch(err) { alert("Fout bij analyse: " + err.message); }
    };
    r.readAsText(file, "utf-8");
  }, []);

  const counts = useMemo(() => {
    if (!analysis) return {};
    const c = {alle:0,probleem:0,"niet-afgesloten":0,contractor:0,compleet:0,aandacht:0};
    analysis.results.forEach(r => { c.alle++; c[r.status]=(c[r.status]||0)+1; });
    return c;
  }, [analysis]);

  const filtered = useMemo(() => {
    if (!analysis) return [];
    const tabFilter = tab==="compleet" ? r => r.status==="compleet"||r.status==="aandacht" : r => r.status===tab;
    function sortKey(r) {
      const extraBadges = r.flags.includes("NB_ON_PROJECT")||r.flags.includes("OVER_HOURS")||r.flags.includes("WEEKEND_WORKED")||r.flags.includes("HOLIDAY_WORKED");
      const isCompleet = r.status==="compleet"||r.status==="aandacht";
      if (r.status==="niet-afgesloten") return 0;
      if (r.status==="probleem"&&extraBadges) return 1;
      if (r.status==="probleem") return 2;
      if (isCompleet&&r.flags.includes("NB_ON_PROJECT")) return 3;
      if (r.status==="contractor") return 4;
      if (isCompleet&&extraBadges) return 5;
      if (r.status==="aandacht") return 6;
      return 7;
    }
    return (tab==="alle"?analysis.results:analysis.results.filter(tabFilter)).slice().sort((a,b)=>sortKey(a)-sortKey(b));
  }, [analysis, tab]);

  const TABS = [
    {k:"alle",l:`Alle (${counts.alle||0})`},
    {k:"probleem",l:`Probleem (${(counts.probleem||0)+(counts["niet-afgesloten"]||0)})`},
    {k:"niet-afgesloten",l:`Niet afgesloten (${counts["niet-afgesloten"]||0})`},
    {k:"contractor",l:`Contractor (${counts.contractor||0})`},
    {k:"compleet",l:`Compleet (${(counts.compleet||0)+(counts.aandacht||0)})`},
  ];

  const Topbar = () => (
    <div className="topbar">
      <span className="logo">PHPro</span>
      <span className="page">Timesheet Compliance</span>
      <div className="topbar-spacer"/>
      {currentUser && (
        <div className="topbar-user">
          <div className="avatar">{currentUser.initials}</div>
          <span>{currentUser.naam.split(" ")[0]}</span>
          <button className="switch-btn" onClick={handleSwitch}>Niet jij?</button>
        </div>
      )}
    </div>
  );

  if (step==="loading") return (
    <><style>{css}</style><div className="app"><Topbar/><div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh",color:"var(--muted)",fontSize:13}}>Laden…</div></div></>
  );
  if (step==="select") return (
    <><style>{css}</style><div className="app"><Topbar/><div className="main"><RoleSelect onSelect={handleSelect}/></div></div></>
  );
  if (step==="upload") return (
    <><style>{css}</style>
    <div className="app"><Topbar/>
      <div className="main">
        <div className="upload-wrap">
          <div className={`upload-card${drag?" drag":""}`}
            onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
            onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0]);}}
            onClick={()=>document.getElementById("fi").click()}>
            <div className="upload-icon">📂</div>
            <h3>Sleep de TIA CSV-export hier</h3>
            <p>of klik om een bestand te selecteren</p>
            <input id="fi" type="file" accept=".csv" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
          </div>
        </div>
      </div>
    </div></>
  );

  return (
    <><style>{css}</style>
    <div className="app"><Topbar/>
      <div className="main">
        <div className="page-header">
          <div className="month-nav">
            <h1>{MONTHS[analysis.month]} {analysis.year}</h1>
            <span style={{fontSize:12,color:"var(--muted)",marginLeft:8,fontFamily:"var(--mono)"}}>{analysis.workDays.length} werkdagen · {analysis.results.length} consultants</span>
          </div>
          <button className="btn btn-outline" onClick={()=>{setStep("upload");setAnalysis(null);}}>Upload nieuwe CSV</button>
        </div>
        {analysis.ordsZonderPM.length>0&&<div className="ord-warn">⚠ ORDs zonder PM-koppeling: {analysis.ordsZonderPM.join(", ")}</div>}
        <div className="tabs">{TABS.map(t=><button key={t.k} className={`tab${tab===t.k?" active":""}`} onClick={()=>setTab(t.k)}>{t.l}</button>)}</div>
        <div className="table">
          <div className="table-header"><span>Consultant</span><span>Totale uren</span><span>Voortgang</span><span>Ontbrekende dagen</span><span>Aandacht</span><span>Status</span></div>
          {filtered.length===0&&<div className="no-res">Geen resultaten</div>}
          {filtered.map(r=>{
            const pct=Math.min(100,Math.round((r.total/r.exp)*100));
            const fc=r.status==="compleet"||r.status==="aandacht"?"ok":r.status==="probleem"?"error":r.status==="contractor"?"contractor":"warn";
            return (
              <div key={r.employee} className="row" onClick={()=>setModal(r)}>
                <div className="row-inner">
                  <div className="name-cell"><div className="name">{r.config?.naam||r.employee}</div><div className="sub">{r.config?.team||"—"}</div></div>
                  <div className="hours-cell">{r.total.toFixed(1)}/{r.exp}</div>
                  <div className="progress-cell"><div className="progress-bar"><div className={`progress-fill pf-${fc}`} style={{width:`${pct}%`}}/></div><span className="progress-pct">{pct}%</span></div>
                  <div className={`missing-cell${r.missing.length>0?" bad":""}`}>{r.missing.length>0?`${r.missing.length}d`:"—"}</div>
                  <div className="att-cell">{r.att>0?<span className="att-count">🔔 {r.att}</span>:<span style={{color:"var(--muted)"}}>—</span>}</div>
                  <div style={{display:'flex',gap:'4px',flexWrap:'wrap',alignItems:'center'}}>
                    <span className={`badge ${r.status}`}>{SL[r.status]}</span>
                    {r.flags.includes('NB_ON_PROJECT')&&<span className="badge nb-uren">NB uren</span>}
                    {r.flags.includes('OVER_HOURS')&&<span className="badge overuren">Overuren</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modal&&<Modal r={modal} onClose={()=>setModal(null)}/>}
    </div></>
  );
}
