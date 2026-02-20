
import { LevelConfig } from './types';

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    themeColor: '#4ade80',
    ambientIntensity: 0.4,
    keyRevealMechanism: 'drawer',
    pinCode: '1024',
    questionHint: "Standard C foundations.",
    locationHint: "The middle shelf (Drawer 1) holds the key.",
    questions: [
      {
        type: 'MCQ',
        topic: 'Syntax',
        prompt: 'Which character is used to terminate a statement in C?',
        hint: 'It is a common punctuation mark used at the end of sentences in some contexts, but mandatory here.',
        options: [':', '.', ';', ','],
        answer: ';'
      },
      {
        type: 'MCQ',
        topic: 'History',
        prompt: 'Who invented the C programming language?',
        hint: 'He worked at Bell Labs and also helped create Unix.',
        options: ['Dennis Ritchie', 'Bjarne Stroustrup', 'James Gosling', 'Guido van Rossum'],
        answer: 'Dennis Ritchie'
      },
      {
        type: 'MCQ',
        topic: 'Comments',
        prompt: 'How do you start a multi-line comment in C?',
        hint: 'It involves a forward slash followed by an asterisk.',
        options: ['//', '/*', '<!--', '#'],
        answer: '/*'
      }
    ]
  },
  {
    id: 2,
    themeColor: '#60a5fa',
    ambientIntensity: 0.35,
    keyRevealMechanism: 'drawer',
    pinCode: '2048',
    questionHint: "Logical and arithmetic operations.",
    locationHint: "Check the top shelf (Drawer 0).",
    questions: [
      {
        type: 'TEXT',
        topic: 'Logic',
        prompt: 'What is the result of (5 > 3 && 2 < 1)? (0 or 1)',
        hint: '&& is the AND operator; both sides must be true for the result to be true.',
        answer: '0'
      },
      {
        type: 'MCQ',
        topic: 'Precedence',
        prompt: 'Which operator has higher precedence: * or +?',
        hint: 'Think about standard PEMDAS/BODMAS rules used in mathematics.',
        options: ['*', '+', 'Same precedence'],
        answer: '*'
      },
      {
        type: 'TEXT',
        topic: 'Assignment',
        prompt: 'What value is in x after: int x = 10; x += 5; x *= 2;',
        hint: 'Step 1: add 5. Step 2: multiply the resulting total by 2.',
        answer: '30'
      }
    ]
  },
  {
    id: 3,
    themeColor: '#facc15',
    ambientIntensity: 0.3,
    keyRevealMechanism: 'drawer',
    pinCode: '4096',
    questionHint: "Pointers and memory addresses.",
    locationHint: "The bottom shelf (Drawer 2) is now accessible.",
    questions: [
      {
        type: 'MCQ',
        topic: 'Pointers',
        prompt: 'Which operator is used to get the address of a variable?',
        options: ['*', '&', '->', '@'],
        hint: 'It is also known as the "ampersand" symbol.',
        answer: '&'
      },
      {
        type: 'TEXT',
        topic: 'Pointers',
        prompt: 'If p is int*, what does *p represent?',
        hint: 'One gets the address, the other gets the actual content stored at that address.',
        answer: 'value'
      },
      {
        type: 'MCQ',
        topic: 'Arrays',
        prompt: 'If arr is an array, arr[3] is equivalent to which pointer expression?',
        options: ['*(arr + 3)', '*arr + 3', '&arr + 3', 'arr->3'],
        hint: 'Array indexing is just syntactic sugar for pointer arithmetic and dereferencing.',
        answer: '*(arr + 3)'
      }
    ]
  },
  {
    id: 4,
    themeColor: '#f87171',
    ambientIntensity: 0.25,
    keyRevealMechanism: 'drawer',
    pinCode: '8192',
    questionHint: "Memory and strings.",
    locationHint: "Interact with the TV to reveal the final stage.",
    questions: [
      {
        type: 'TEXT',
        topic: 'Memory',
        prompt: 'Which function allocates a specific number of bytes and returns a void pointer?',
        hint: 'The name is shorthand for "memory allocation".',
        answer: 'malloc'
      },
      {
        type: 'MCQ',
        topic: 'Strings',
        prompt: 'What is the last character in a C string by default?',
        options: ['\\n', '\\t', '\\0', '\\s'],
        hint: 'It is the "null terminator" character.',
        answer: '\\0'
      },
      {
        type: 'TEXT',
        topic: 'Sizes',
        prompt: 'What operator returns the size of a data type in bytes?',
        hint: 'It looks like a function call but is a built-in operator that takes a type or variable.',
        answer: 'sizeof'
      }
    ]
  },
  {
    id: 5,
    themeColor: '#c084fc',
    ambientIntensity: 0.2,
    keyRevealMechanism: 'drawer',
    pinCode: '9999',
    questionHint: "Advanced concepts.",
    locationHint: "Open the drawers to find the final exit key.",
    questions: [
      {
        type: 'MCQ',
        topic: 'Advanced',
        prompt: 'What does the "static" keyword do to a local variable?',
        hint: 'It allows the variable to "remember" its value even after the function exits.',
        options: ['Makes it constant', 'Preserves value between calls', 'Moves it to heap', 'Makes it global'],
        answer: 'Preserves value between calls'
      },
      {
        type: 'TEXT',
        topic: 'Structures',
        prompt: 'Which operator accesses a structure member via a pointer?',
        hint: 'It looks like an arrow pointing to the member.',
        answer: '->'
      },
      {
        type: 'MCQ',
        topic: 'Macros',
        prompt: 'Which preprocessor directive is used to define a macro?',
        hint: 'It starts with # and is followed by the word "define".',
        options: ['#macro', '#const', '#define', '#set'],
        answer: '#define'
      }
    ]
  }
];
