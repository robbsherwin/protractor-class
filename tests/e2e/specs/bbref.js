var VotePage = require('../pages/votePage.js');
const colors = require('colors');

describe('BBREF Rookie Validation', function () {
    let notInGameArray = [''];
    let inGameArray = [''];
    let cantFindPlayerArray = [''];
    

    //let players = ['Fernando Abad', 'Cory Abbott', 'Albert Abreu', 'Bryan Abreu', 'Domingo Acevedo', 'Joan Adon', 'Miguel Aguilar', 'R.J. Alaniz', 'Andrew Albers', 'A.J. Alexy', 'Nick Allgeyer', 'Drew Anderson', 'Shaun Anderson', 'Tanner Anderson', 'Chris Archer', 'Kohei Arihara', 'Aaron Ashby', 'Pedro Avila', 'Luis Avilan', 'John Axford', 'Bryan Baker', 'Alberto Baldonado', 'Anthony Banda', 'Joe Barlow', 'Charlie Barnes', 'Kyle Barraclough', 'Manny Barreda', 'Mike Baumann', 'Shane Baz', 'Eduard Bazardo', 'Jeremy Beasley', 'Tyler Beede', 'Andrew Bellatti', 'Dellin Betances', 'Alec Bettinger', 'Joe Biagini', 'Jesse Biddle', 'Paul Blackburn', 'Scott Blewett', 'Ronald Bolanos', 'Akeem Bostick', 'Ben Bowden', 'Brad Brach', 'John Brebbia', 'Brandon Brennan', 'Justin Bruihl', 'Ryan Buchter', 'J.B. Bukauskas', 'Zack Burdi', 'Ryan Burr', 'Beau Burrows', 'Matt Bush', 'Edward Cabrera', 'Daniel Camarena', 'Paul Campbell', 'Drew Carlton', 'Daniel Castano', 'Humberto Castellanos', 'Anthony Castro', 'Kervin Castro', 'Jesse Chavez', 'Alex Claudio', 'Sam Clay', 'Garrett Cleavinger', 'Kyle Cody', 'Dylan Coleman', 'Adam Conley', 'Roansy Contreras', 'Jharel Cotton', 'Daniel Coulombe', 'Jake Cousins', 'Kutter Crawford', 'Kyle Crick', 'Cooper Criswell', 'Hans Crouse', 'Tucker Davidson', 'Austin Davis', 'Wade Davis', 'Chase De Jong', 'Jose De Leon', 'Enyel De Los Santos', 'Miguel Del Pozo', 'Reid Detmers', 'Chris Devenski', 'Jhonathan Diaz', 'Miguel Diaz', 'Yennsy Diaz', 'Brandon Dickson', 'Marcos Diplan', 'Kyle Dohy', 'Seranthony Dominguez'] 
    //let players = ['Camilo Doval', 'Robert Dugger', 'Jon Duplantier', 'Carl Edwards', 'Scott Effross', 'Jerad Eickhoff', 'Seth Elledge', 'Chris Ellis', 'Kent Emanuel', 'Dietrich Enns', 'Raynel Espinal', 'Demarcus Evans', 'Bailey Falter', 'Jacob Faria', 'Luke Farrell', 'Michael Feliz', 'Neftali Feliz', 'Ryan Feltner', 'Julian Fernandez', 'Junior Fernandez', 'Jay Flaa', 'Aaron Fletcher', 'Bernardo Flores', 'Jason Foley', 'Seth Frankoff', 'Luis Frias', 'Edgar Garcia', 'Luis A Garcia', 'Braxton Garrett', 'Justin Garza', 'Ralph Garza', 'Ian Gibaut', 'Luis Gil', 'Tyler Gilbert', 'Lucas Gilbreath', 'Kevin Ginkel', 'Stephen Gonsalves', 'Anthony Gose', 'Ashton Goudeau', 'Conner Greene', 'Reymin Guduan', 'Sean Guenther', 'Javy A Guerra', 'Preston Guilmet', 'Jandel Gustave', 'Jorge Guzman', 'JD Hammer', 'Eric Hanhold', 'Blaine Hardy', 'Ryan Hartman', 'Louis Head', 'Jon Heasley', 'Ryan Hendrix', 'David Hess', 'Jordan Hicks', 'Trevor Hildenberger', 'Jordan Holloway', 'Brent Honeywell', 'Spencer Howard', 'Drew Hutchison', 'Tyler Ivey', 'Andre Jackson', 'Jay Jackson', 'Mickey Jannis', 'Daulton Jefferies', 'Jake Jewell', 'DJ Johnson', 'Damon Jones', 'Nate Jones', 'Jakob Junis', 'Janson Junk', 'Scott Kazmir', 'Keone Kela', 'Kyle Keller', 'Mike Kickham', 'John King', 'Gabe Klobosits', 'Reiss Knehr', 'Dusten Knight', 'Brody Koerner', 'Jackson Kowar', 'Max Kranick', 'Joey Krehbiel', 'Brooks Kriske', 'Ian Krol', 'Brady Lail', 'Jimmy Lambert', 'Peter Lambert', 'Alex Lange', 'Jake Latz', 'Derek Law', 'Justin Lawrence', 'Dylan Lee'] 
    //let players = ['Mauricio Llovera', 'Kyle Lobstein', 'Sammy Long', 'Richard Lovelady', 'Zac Lowther', 'Andres Machado', 'Luis Madero', 'Joe Mantiply', 'Jose Marte', 'Corbin Martin', 'Seth Martinez', 'Isaac Mattson', 'Darren McCaughan', 'Alex McRae', 'Nick Mears', 'Adonis Medina', 'Trevor Megill', 'Ryan Meisinger', 'Humberto Mejia', 'Conner Menez', 'Julian Merryweather', 'Miles Mikolas', 'Justin Miller', 'Shelby Miller', 'Wyatt Mills', 'Hoby Milner', 'Juan Minaya'] 
    //let players = ['Bryan Mitchell', 'Sam Moll', 'Jovani Moran', 'Adrian Morejon', 'Dauri Moreta', 'Adam Morgan', 'Shawn Morimando', 'Reyes Moronta', 'Kyle Muller', 'Andres Munoz', 'Patrick Murphy', 'Tommy Nance', 'Packy Naughton', 'Nick Neidert', 'Jimmy Nelson', 'Kyle Nelson', 'Ljay Newsome', 'Vinny Nittoli', 'Stephen Nogosek', 'Sean Nolin', 'Aaron Northcraft', 'James Norwood', 'Darien Nunez', 'Riley O\'Brien', 'Steven Okert', 'Kaleb Ort', 'Oliver Ortega', 'Glenn Otto', 'Connor Overton', 'Luis Oviedo', 'Spencer Patton', 'David Paulino', 'Brad Peacock', 'Nate Pearson', 'Elvis Peguero', 'Angel Perdomo', 'Cionel Perez', 'Francisco Perez', 'Dillon Peters', 'Jake Petricka', 'David Phelps', 'Cody Ponce', 'Sean Poppen', 'Cody Poteet', 'Austin Pruitt', 'A.J. Puk', 'Kevin Quackenbush', 'Jose Quijada', 'Roel Ramirez', 'Yefry Ramirez', 'A.J. Ramos', 'Colin Rea', 'Jake Reed', 'Stephen Ridings', 'Yacksel Rios', 'David Robertson', 'Chris Rodriguez', 'Jefry Rodriguez', 'Manuel Rodriguez', 'Nivaldo Rodriguez', 'Josh Rogers', 'Sal Romano', 'Jhon Romero', 'JoJo Romero', 'Angel Rondon', 'Zac Rosscup', 'Ramon Rosso', 'Ben Rowen', 'Michael Rucker', 'Joe Ryan', 'Kyle Ryan', 'Chris Sale', 'Adrian Sampson', 'Aaron Sanchez', 'Cristopher Sanchez', 'Miguel Sanchez', 'Nick Sandlin', 'Reiver Sanmartin', 'Edgar Santana', 'Hector Santiago', 'Tony Santillan', 'Antonio Santos', 'Gregory Santos', 'Tayler Saucedo', 'Mac Sceroler', 'Clarke Schmidt', 'John Schreiber', 'Connor Seabold', 'Luis Severino', 'Jordan Sheffield', 'Jimmie Sherfy', 'Brandyn Sittinger', 'Devin Smeltzer', 'Joe Smith', 'Kirby Snead', 'Nick Snyder', 'Peter Solomon', 'Gabe Speier', 'Shea Spitzbarth', 'Robert Stephenson', 'Kohl Stewart', 'Jonathan Stiever', 'Robert Stock', 'Spencer Strider', 'Pedro Strop', 'Anthony Swarzak', 'Noah Syndergaard', 'Thomas Szapucki', 'Domingo Tapia', 'Stephen Tarpley', 'Mason Thompson', 'Ty Tice']
    //let players = ['Justin Topa', 'Kyle Tyler', 'Edwin Uceta', 'Andrew Vasquez', 'Alex Vesia', 'Will Vest', 'Brandon Waddell', 'Konner Wade', 'Andrew Wantz', 'Art Warren', 'Austin Warren', 'Jacob Webb', 'Patrick Weigel', 'Alexander Wells', 'Mitch White', 'Kodi Whitley', 'Brad Wieck', 'Hunter Wood', 'Brandon Workman', 'Mike Wright', 'Miguel Yajure', 'Jordan Yamamoto', 'Hyeon-Jong Yang', 'Daniel Zamora', 'Angel Zerpa', 'T.J. Zeuch', 'Jordan Zimmermann', 'Riley Adams', 'Albert Almora', 'Eddy Alvarez', 'Trey Amburgey', 'John Andreoli', 'Humberto Arteaga', 'Luis Barrera', 'Tres Barrera', 'Jose Barrero', 'Seth Beer', 'Braden Bishop', 'Alex Blandino', 'Travis Blankenhorn', 'Skye Bolt', 'Jorge Bonifacio', 'Rob Brantly', 'Vidal Brujan', 'Jake Burger', 'Andy Burns', 'Daz Cameron', 'Eric Campbell', 'Luis Campusano', 'Erick Castillo', 'Ivan Castillo', 'Rodolfo Castro', 'Gilberto Celestino', 'Michael Chavis', 'Nick Ciuffo', 'Ernie Clement', 'Will Craig', 'Oneil Cruz', 'Jaylin Davis', 'Taylor Davis', 'Ronnie Dawson', 'Alex De Goti', 'Austin Dean', 'Greg Deichmann', 'Jose Devers', 'Lewin Diaz', 'Ryan Dorow', 'Brandon Drury', 'Jarren Duran', 'Drew Ellis', 'Stuart Fairchild', 'Johneshwy Fargas', 'Mario Feliciano', 'Estevan Florial', 'Nick Fortes', 'Dustin Fowler', 'Mike Freeman', 'TJ Friedl', 'Aramis Garcia', 'Robel Garcia', 'Kyle Garlick', 'Trent Giambrone', 'Chris Gittens', 'Jose Godoy', 'Luis Gonzalez', 'Romy Gonzalez', 'Taylor Gushue', 'Jake Hager', 'Sam Haggerty', 'Monte Harrison', 'Nick Heath', 'Scott Heineman', 'Payton Henry', 'Michael Hermosillo', 'John Hicks', 'P.J. Higgins', 'Jared Hoying', 'Scott Hurst', 'Kyle Isbel', 'Jon Jay', 'Daniel Johnson'];
    //let players = [ 'Jahmai Jones', 'Taylor Jones', 'Sean Kazmar', 'Patrick Kivlehan', 'Pete Kozma', 'Tyler Ladendorf', 'Ryan LaMarre', 'Khalil Lee', 'Domingo Leyba', 'Jose Lobaton', 'Alejo Lopez', 'Jack Lopez', 'Otto Lopez', 'Josh Lowe', 'Jonathan Lucroy', 'Luke Maile', 'Tucupita Marcano', 'Rafael Marchan', 'Deven Marrero', 'Luis Marte', 'Richie Martin', 'Nick Martini', 'Wyatt Mathisen', 'Nick Maton', 'Patrick Mazeika', 'Jake McCarthy', 'Jordy Mercer', 'Brian Miller', 'Mickey Moniak', 'Max Moroff', 'Taylor Motter', 'Sheldon Neuse', 'Tyler Nevin', 'John Nogowski', 'Lars Nootbaar', 'Brian O\'Grady', 'Jared Oliva', 'Hunter Owen', 'Cristian Pache', 'Kevin Padlo', 'Josh Palacios', 'Hoy Jun Park', 'Gerardo Parra', 'Tyler Payne', 'Mark Payton', 'Geraldo Perdomo', 'Hernan Perez', 'Yohel Pozo', 'Luke Raley', 'Henry Ramos', 'Corey Ray', 'Jakson Reetz', 'Zach Reks', 'Pablo Reyes', 'Alfonso Rivas', 'Webster Rivas', 'Emmanuel Rivera', 'Rene Rivera', 'Sebastian Rivero', 'Jacob Robson', 'Jake Rogers', 'Andrew Romine', 'Jose Rondon', 'Ben Rortvedt', 'Keibert Ruiz', 'Adrian Sanchez', 'Ali Sanchez', 'Danny Santana', 'Scott Schebler', 'Max Schrock', 'Jose Siri', 'Kevin Smith', 'Steven Souza', 'Troy Stokes', 'Anderson Tejeda', 'Curtis Terry', 'Matt Thaiss', 'Dillon Thomas', 'Trayce Thompson', 'Ka\'ai Tom', 'Wilfredo Tovar', 'Alan Trejo', 'Cole Tucker', 'Breyvic Valera', 'Matt Vierling', 'Ryan Vilade', 'Jason Vosler', 'Donovan Walton', 'Colton Welker', 'Steve Wilkerson', 'Justin Williams', 'Luke Williams', 'Mason Williams', 'Nick Williams', 'Cody Wilson', 'Jacob Wilson', 'Connor Wong', 'Kean Wong', 'Austin Wynns', 'Andrew Young', 'Seby Zavala']
    let players = ["Andres Machado", "Jose Marte", "Humberto Mejia", "Justin Miller", "Wyatt Mills", "Bryan Mitchell", "Adam Morgan", "Kyle Muller", "Andres Munoz", "Patrick Murphy", "Jimmy Nelson", "Kyle Nelson", "Riley O'Brien", "Luis Oviedo", "Spencer Patton", "David Paulino", "Brad Peacock", "Francisco Perez", "Dillon Peters", "Jake Reed", "Chris Rodriguez", "Manuel Rodriguez", "Josh Rogers", "Angel Rondon", "Michael Rucker", "Joe Ryan", "Kyle Ryan", "Miguel Sanchez", "Hector Santiago", "Antonio Santos", "John Schreiber", "Luis Severino", "Jimmie Sherfy", "Joe Smith", "Nick Snyder", "Robert Stephenson", "Robert Stock", "Kyle Tyler", "Andrew Vasquez", "Austin Warren", "Jacob Webb", "Mitch White", "Hunter Wood", "Mike Wright", "Daniel Zamora", "Luis Barrera", "Andy Burns", "Eric Campbell", "Luis Campusano", "Will Craig", "Taylor Davis", "Austin Dean", "Jose Devers", "Drew Ellis", "Luis Gonzalez", "John Hicks", "Scott Hurst", "Jon Jay", "Daniel Johnson", "Taylor Jones", "Jose Lobaton", "Alejo Lopez", "Jack Lopez", "Josh Lowe", "Luis Marte", "Richie Martin", "Jake McCarthy", "Brian Miller", "Tyler Nevin", "Hunter Owen", "Cristian Pache", "Gerardo Parra", "Tyler Payne", "Hernan Perez", "Yohel Pozo", "Corey Ray", "Pablo Reyes", "Alfonso Rivas", "Rene Rivera", "Sebastian Rivero", "Jake Rogers", "Andrew Romine", "Jose Rondon", "Adrian Sanchez", "Ali Sanchez", "Kevin Smith", "Anderson Tejeda", "Dillon Thomas", "Wilfredo Tovar", "Cole Tucker", "Justin Williams", "Luke Williams", "Mason Williams", "Nick Williams", "Cody Wilson", "Jacob Wilson", "Connor Wong", "Andrew Young"];

    
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000000;
        votePage = new VotePage();
        var width = 1920;
        var height = 1200;
        browser.driver.manage().window().setSize(width, height);
        browser.sleep(2000);
    });

    afterEach(function () {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        browser.manage().deleteAllCookies();
        browser.sleep(3000);
    });

    it('should let us go to the site and vote for a player.', async function () {
        await votePage.navigateToSite("baseball-reference.com");

        for(x=0; x<players.length; x++) {
            await votePage.lookUpPlayer(players[x], notInGameArray, inGameArray, cantFindPlayerArray);    
        }
        
        // The right thing to do here is to print out the arrays to files. This would also allow us to look up the 
        // players that have been categoried and not search for them again, so this would be robust if we 
        // had an interruption in the program. 

        await console.log("******".red);

        await console.log("PLAYERS NOT IN THE GAME:".red);

        notInGameArray.forEach(function(item, index, array) {
            await console.log(item)
        });

        await console.log("******".red);

        await console.log("PLAYERS IN THE GAME:".green);

        inGameArray.forEach(function(item, index, array) {
            await console.log(item)
        });

        await console.log("******".green);

        await console.log ("COULD NOT FIND THESE PLAYERS:".yellow);
        cantFindPlayerArray.forEach(function(item, index, array) {
            await console.log(item)
        });
    });     

});





