import json
P = '4bb554_'
def T(r, blocks, mo=None):
    d = {"k": "t", "r": r, "b": blocks}
    if mo is not None: d["mo"] = mo
    return d
def I(r, id_, alt="", c=None):
    d = {"k": "i", "r": r, "id": P + id_, "alt": alt}
    if c: d["c"] = c
    return d
HR = {"k": "s", "r": [-68.5, 8, 284, 7]}
BADGE_D = open('build/tools/badge-path.txt').read().strip()

secs = []
# 1 hero
secs.append({"h": 722, "bg": "", "items": [
    T([242.5, 288, 610, 112], [["h1", "s40", "", "<span style=\"background:rgb(255, 255, 255)\">MA Thesis:<br>Boundless Design</span>", ""]]),
    T([242.5, 414, 610, 75.5], [["h1", "p18", "", "<span style=\"background:rgb(255, 255, 255)\">A study and exploration of the paradigm of integration in design,<br>its effects on inter connectivity of objects, and proposals for<br>innovative interfaces.</span>", ""]]),
    I([339.5, 0, 863, 650], "a0bcfdfa5da147e5800b8122e60b804f", "BD_View_05.jpg"),
]})
# 2 overview
secs.append({"h": 904, "bg": "", "items": [
    T([242.5, 0, 76, 39], [["h6", "s14", "", "Project overview", ""]], 0),
    T([339.5, 0, 162, 33.5], [["h6", "s24", "", "Key themes", ""]], 1),
    T([325.5, 50, 263, 101], [["ul", "p18", "", ["Design Theory", "Functionality integration", "Building complexity through fractal approach to design"]]], 2),
    T([651.5, 0, 251, 33.5], [["h6", "s24", "", "Areas of design", ""]], 3),
    T([639.5, 50, 263, 101], [["ul", "p18", "", ["Design Theory", "UX/UI", "Product", "Branding"]]], 4),
    T([1031.5, 0, 170, 101], [["h6", "s24", "", "<a href=\"https://www.designmadeingermany.de/#123703\" target=\"_blank\" rel=\"noopener\">Featured in<br>Design Made in Germany</a>", ""]], 6),
    T([339.5, 225, 343, 33.5], [["h6", "s24", "", "Designing complex sytems", ""]]),
    T([339.5, 280.5, 640, 554.5], [
        ["p", "p18", "", "Extensive communication capabilities are a fact of the contemporary world and have very strongly influenced design solutions, creating powerful, unlocalized systems of specialized objects working in network. Meanwhile, advances in the efficiency of material and energy consumption gave rise to extremely multifunctional devices, complex systems within the object that don’t have to rely on external structures to accomplish a great variety of tasks. Both contradictory and complementary in nature, these distinct sides of the integration paradigm can be observed very pronouncedly in the industrial, interface and service design fields and testifies to the human flexibility in understanding the world around her/himself. Through this flexibility, our society finds ways to integrate objects to maximize efficiency, well-being, entertainment, communication and enable experiences, all at the same time.", ""],
        ["p", "p18", "", "", ""],
        ["p", "p18", "", "Between its promises and perils, this thesis studies the mechanisms that facilitate or restrict the development and use of these complex systems of objects, these boundless objects, through the description and exploration of the nature of objects in term of how we understand them as fractal relationships, and the role of design, designers, and users in defining said systems.", ""],
        ["p", "p18", "", "", ""],
        ["p", "p18", "", "This is a matter of acknowledging the relationship between objects and of them with their users, which ultimately defines the role of design and designers in the active and intentional shaping of things.", ""],
    ]),
    dict(I([949.5, 214, 399, 600], "b11da89607f04303a7ebc5dc253d8520"), mo=99999),
    {"k": "svg", "mo": 5, "r": [911.5, 8, 95, 93], "href": "https://www.designmadeingermany.de/#123703", "vb": "0 0.01 650.214 642.869", "d": BADGE_D, "fill": "#242323", "label": "Featured in Design Made in Germany"},
    HR,
]})
# 3 theory
secs.append({"h": 659, "bg": "", "items": [
    T([241.5, 0, 197, 19.5], [["h6", "s14", "", "Boundless Design theory", ""]]),
    T([706.5, 68, 459, 509.5], [["h5", "s28", "", "This master’s thesis explored the process of understanding from a theoretical and philosophical perspective, examining its impact on design. Through this research, I realized that our perception—shaped by orientation, distance, and time—affects how we interpret objects. In essence, we don’t interact with objects themselves but with our understanding of them.", ""]]),
    I([5.5, 108, 659, 429], "f80ddd91ff6c4d12bd3eef53664ef70a", "", [255, 250, 2485, 1744]),
    HR,
]})
# 4 ideation
secs.append({"h": 1080, "bg": "", "items": [
    T([242.5, 8, 197, 19.5], [["h6", "s14", "", "Ideation and concepts", ""]]),
    T([390.5, 364, 643, 164], [
        ["p", "p18", "", "Using the ideas and conclusions from the theoretical study, combined with the results from the case study, I began designing a variety of applications for them, ranging from physical objects to interfaces, identity and service concepts.", ""],
        ["p", "p18", "", "Many were the tools used to study these projects. Hand drawing, wireframing, and 3D modeling were amongst them. Still, they were always initiated and guided by the theoretical findings.", ""],
    ]),
    I([706.5, 130, 267, 107], "3c29cf0a402b4c18876259da8b6a5852", "", [0, 85, 2126, 856]),
    I([973.5, 28, 408, 384], "6d1d294ba34a4beea555c24fb9e84f3d"),
    I([368.5, 76, 284, 246], "1c6c4043664c4f0689c437898f91c471", "img339_edited.jpg", [10, 0, 981, 836]),
    I([103.5, 92, 273, 215], "33c1da5c6f47410599c13a0d49394153", "img386.jpg", [53, 16, 1123, 884]),
    I([-205.5, 521, 789, 456], "3eb2b3b35f704c519ba1bf2a1bab49a2", "Boundless design-50-100_pages-to-jpg-004", [135, 242, 2724, 1575]),
    I([678.5, 590, 197, 355], "5b23e3a69fc948cdbd9035a796b5de40", "img241.jpg"),
    I([998.5, 579, 204, 398], "ed5fccd9f58b4c8c9e9a0ce6a5bb0210", "img239.jpg"),
    {"k": "s", "r": [-68.5, 15, 284, 7]},
]})
# 5 prototyping (black)
secs.append({"h": 505, "bg": "rgb(0, 0, 0)", "items": [
    T([222.5, 29, 197, 19.5], [["h6", "s14", "", "<span style=\"color:rgb(255, 255, 255)\">Prototyping</span>", ""]]),
    I([722.5, 49, 510, 456], "c78dfb30ac004305be510ec596ffb1b0", "img679_edited_edited.png"),
    I([25.5, 49, 763, 447], "0facf3869d1b460687a1e2512dd2af12", "img702_edited_edited.jpg", [12, 0, 2106, 1234]),
]})
# 6 snow os
def slides(ids, w, h, special=None):
    out = []
    for i in ids:
        ww = (special or {}).get(i, w)
        out.append({"id": P + i, "w": ww, "h": h, "alt": ""})
    return out
g1 = ["d1de1564d594420dae5e7ca0a664063a", "99d9223acf9145ffb1654bee49b392fc", "f1e47d1a4bbf4c6e98f1f155c508f7c7", "bc2337310625477abc8a7f1d306d1b61", "34252d42f54d48b4985a5a3d133eb4b0", "84e5c5e6ad84421da741ca313fdedc17", "1a1e8d7c4b1946f981f029f936b183c3"]
g2 = ["d9fc9a538eb24bbfb26e37dd02a00000", "83329d9825a64f2685198c166ceb2f75", "7dda413c1b194b94a4bd1a79702e1400", "6f6a34129ab54bd8bbf0b221c0302a2c"]
g3 = ["82b331ae0d90444ea70361e7a258b6e7", "80c9ad65b5ca4c4796ac140a385b885b", "33b363c3bccb46209a668b8bea5000e2", "3bc61c16a56a4cec8f927cef4ff81daa"]
secs.append({"h": 1078, "bg": "", "items": [
    T([232.5, 63, 236, 70], [["h3", "s50", "", "Snow OS", "center"]]),
    T([232.5, 133, 247, 67], [["h3", "p30", "", "for mobile devices", "center"]]),
    T([945, 63, 236, 70], [["h3", "s50", "", "Snow OS", "center"]]),
    T([945, 133, 247, 67], [["h3", "p30", "", "for wearables", "center"]]),
    T([992, 223, 143, 27], [["h3", "p15", "", "COLOR SCREEN", "center"]]),
    T([890, 664, 335, 27], [["h3", "p15", "", "E-PAPER", "center"]]),
    {"k": "strip", "r": [113.5, 271, 488, 698], "gap": 147, "label": "Snow OS for mobile devices", "slides": slides(g1, 360, 698, {"84e5c5e6ad84421da741ca313fdedc17": 392})},
    {"k": "strip", "r": [824, 250, 488, 354], "gap": 207, "label": "Snow OS for wearables, colour screen", "slides": slides(g2, 291, 354)},
    {"k": "strip", "r": [824, 691, 488, 286], "gap": 62, "label": "Snow OS for wearables, e-paper", "slides": slides(g3, 368, 286)},
]})
json.dump({"W": 1425, "secs": secs}, open('build/data/academic-work.json', 'w'), ensure_ascii=False, indent=0)
print('ok', len(secs))
