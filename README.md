# chat-media-view

Telegram-style image grid for React chat applications

## Installation

```bash
npm install chat-media-view
# or
yarn add chat-media-view
```

## Usage

```jsx
import React from 'react';
import { ChatMediaView } from 'chat-media-view';
import 'chat-media-view/styles.css';

const App = () => {
  const images = [
    'https://via.placeholder.com/150/FF0000/FFFFFF?text=Image+1',
    'https://via.placeholder.com/150/00FF00/FFFFFF?text=Image+2',
    'https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+3',
  ];

  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <ChatMediaView images={images} />
    </div>
  );
};

export default App;
```

## Development Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the library for production.
- `npm run test`: Runs tests.
- `npm run storybook`: Starts the Storybook development server.
