# Rat Mapper 🐀
This is a science fair for RIT's BIOL-101 to explore genomics.  To do this, we
created a program which uses a simulated genome to correlate phenotypic traits
with genotypes.

This allows us to show how changes in phenotype correspond with changes in the
underlying DNA, as well as the proteins which code for the traits.  Additionally,
we could simulate meiosis to show what the offspring of two different rats would
be.

## Technology
The project is implemented as a full-stack web application. It involves a
Single-page application which communicates with a RESTful API for storage
and persistence. The front end was written in Typescript, using 
[preact.js](https://preactjs.com/) (a lightweight, React.js compatible framework).
The back end was written in Python 3, using the
[Flask](https://flask.palletsprojects.com/en/3.0.x/)
web framework, along with [SQLAlchemy](https://www.sqlalchemy.org/) to store
data in a [SQLite](https://www.sqlite.org/index.html) database.

## Screenshots
![The rat creation dashboard](/assets/creation.png)

![The rat breeding page](/assets/breeding.png)

![The dashboard displaying all rats](/assets/family-tree.png)

![The about page](/assets/about.png)

## Attribution
Favicon from from [rawpixel.com](https://www.rawpixel.com/image/10166071/vector-moon-art-cartoon);
Licensed as public domain under CC0.

