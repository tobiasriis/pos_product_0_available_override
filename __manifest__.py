{
    "name": """POS: change 0 qty interface""",
    "summary": """Changes the POS interface to not show price on products without available stock""",
    "category": "Point Of Sale",
    "version": "12.0",
    "application": False,
    "author": "IT-brasil, Tobias Riis",
    "depends": ["point_of_sale", "stock"],
    "external_dependencies": {"python": [], "bin": []},
    "data": ["views/views.xml"],
    "qweb": ["static/src/xml/pos.xml"],
    "installable": True,
}
