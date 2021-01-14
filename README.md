## <a name='TOC'>🐼 Summary</a>

* [Rules](#rules)
* [Overview](#overview)
* [Story](#story)
* [Postlude](#postlude)
* [Bonus](#bonus)
* [Credits](#credits)

## <a name='overview'>🦊 Rules</a>

Hi, here are some rules to carry out this story oav;

* You **MUST** create a git repository named `pp-ailumette`
* You **MUST** create a file called `.author.json` with your fullname

```sh
~/ts-baratie ❯❯❯ cat -e .author.json
{
  "fullname" : "John H. Conway"
}$
```

> Of course, you can talk about the subject with other developers, peer-learning is
> the key to be a better developer. Don't hesitate to ask questions or help people on slack.

> Don't forget, there is no useless question :-)

You **MUST** return the project on Friday January, 15 at 12:00 pm by sending an MP on Teams with the link of your github repo.<br />

Your repository **MUST** contain the totality of your source files, but no useless files (node_modules, temp files, log files,...).

## <a name='overview'>🐱 Overview</a>


## <a name='story'>🐨 Story</a>

### = Prelude

Aillumette is a game based on matches.
- There are a number of match lines.
- The players take turns.
- Each player can take one or more matches on the same line.
- The player who loses is the one who takes the last match.

### = Sample

> With node.js (but language-free)

```sh
$ node ailumette
*********
 *   |   *
 *  |||  *
 * ||||| *
 *|||||||*
 *********

 Your turn:
 Line: 4
 Matches: 2
 Player removed 2 match(es) from line 4
 *********
 *   |   *
 *  |||  *
 * ||||| *
 *|||||  *
 *********

 AI’s turn...
 AI removed 2 match(es) from line 3
 *********
 *   |   *
 *  |||  *
 *  |||  *
 *|||||  *
 *********

 Your turn:
 Line: 1
 Matches: 1
 Player removed 1 match(es) from line 1
 *********
 *       *
 *  |||  *
 *  |||  *
 *|||||  *
 *********

 AI’s turn...
 AI removed 1 match(es) from line 2
 *********
 *       *
 * ||    *
 * |||   *
 *|||||  *
 *********

 Your turn:
 Line: 2
 Matches: 2
 Player removed 2 match(es) from line 2
 *********
 *       *
 *       *
 * |||   *
 *|||||  *
 *********

 AI’s turn...
 AI removed 2 match(es) from line 4
 *********
 *       *
 *       *
 * |||   *
 *|||    *
 *********

 Your turn:
 Line: 3
 Matches: 1
 Player removed 1 match(es) from line 3
 *********
 *       *
 *       *
 * ||    *
 *|||    *
 *********

 AI’s turn...
 AI removed 2 match(es) from line 3
 *********
 *       *
 *       *
 *       *
 *|||    *
 *********

 Your turn:
 Line: 4
 Matches: 2
 Player removed 2 match(es) from line 4
 *********
 *       *
 *       *
 *       *
 *|      *
 *********

 AI’s turn...
 AI removed 1 match(es) from line 4
 *********
 *       *
 *       *
 *       *
 *       *
 *********
 I lost.. snif.. but I’ll get you next time!!
 ```
 
 ```sh
 $ node ailumette
 *********
 *   |   *
 *  |||  *
 * ||||| *
 *|||||||*
 *********

 Your turn:
 Line: 9999
 Error: this line is out of range
 Line: 0
 Error: this line is out of range
 Line: -53
 Error: invalid input (positive number expected)
 Line: lol
 Error: invalid input (positive number expected)
 Line: 3
 Matches: 0
 Error: you have to remove at least one match
 Line: 3
 Matches: -21
 Error: invalid input (positive number expected)
 Line: 2
 Matches: 6789
 Error: not enough matches on this line
 Line: 3
 Matches: chocolat
 Error: invalid input (positive number expected)
 Line: 3
 Matches:
 Error: invalid input (positive number expected)
 Line: 3
 Matches: 2
 Player removed 2 match(es) from line 3
 *********
 *  |    *
 *  |||  *
 * |||   *
 *|||||||*
 *********

 AI’s turn...
 AI removed 1 match(es) from line 4
 *********
 *   |   *
 *  |||  *
 * |||   *
 *|||||| *
 *********

 Your turn:
 Line: 1
 Matches: 1
 Player removed 1 match(es) from line 1
 *********
 *       *
 *  |||  *
 * |||   *
 *|||||| *
 *********

 AI’s turn...
 AI removed 6 match(es) from line 4
 *********
 *       *
 *  |||  *
 * |||   *
 *       *
 *********

 Your turn:
 Line: 1
 Error: this line is empty
 Line: 2
 Matches: 2
 Player removed 2 match(es) from line 2
 *********
 *       *
 *  |    *
 * |||   *
 *       *
 *********

 AI’s turn...
 AI removed 1 match(es) from line 2
 *********
 *       *
 *       *
 * |||   *
 *       *
 *********

 Your turn:
 Line: 3
 Matches: 1
 Player removed 1 match(es) from line 3
 *********
 *       *
 *       *
 * ||    *
 *       *
 *********

 AI’s turn...
 AI removed 1 match(es) from line 3
 *********
 *       *
 *       *
 * |     *
 *       *
 *********

 Your turn:
 Line: 3
 Matches: 1
 Player removed 1 match(es) from line 3
 *********
 *       *
 *       *
 *       *
 *       *
 *********
 You lost, too bad..
 ```

### = How

The goal of the project is to make a program that we can play against.
- The basic version must generate a tray of 4 lines of matches
- The output of your program (including error messages) must correspond to examples established above and be written to standard output.
- After the last message (which indicates the winner), there is only one return to the line
- In case of wrong entry to indicate the number of matches to be removed, it is necessary re-display Line: and it's up to the player to re-enter the line on which
he wants to play.

## <a name='bonus'>🦄 Bonus</a>

I know you love that, well you can in bulk:

* Change the number of lines.
* Add any graphical version.
* Have the choice between several difficulty levels.


## <a name='credits'>🐵 Credits</a>

Craft with :heart: in **Paris**.
