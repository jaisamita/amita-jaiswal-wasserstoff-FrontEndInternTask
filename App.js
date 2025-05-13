/*App.js (frontend)*/

import React,
{
    useState,
    useEffect
} from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
    const [content, setContent] = useState('');
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    useEffect(() => {
        socket.on('updateContent',
            (updatedContent) => {
                setContent(updatedContent);
            });

        socket.on('updateStyleBold',
            (bold) => {
                setBold(bold);
            });

        socket.on('updateStyleItalic',
            (italic) => {
                setItalic(italic);
            });

        socket.on('updateStyleUnderline',
            (underline) => {
                setUnderline(underline);
            });

        return () => {
            socket.off('updateContent');
        };
    }, [bold, italic, underline]);

    const Edit = (event) => {
        const updatedContent = event.target.value;
        setContent(updatedContent);
        socket.emit('edit', updatedContent);
    };

    const Bold = () => {
        if (!bold) {
            setBold(true);
            socket.emit('bold', true);
        }
        else {
            setBold(false);
            socket.emit('bold', false);
        }
    }

    const Italic = () => {
        if (!italic) {
            setItalic(true);
            socket.emit('italic', true);
        }
        else {
            setItalic(false);
            socket.emit('italic', false);
        }
    }

    const Underline = () => {
        if (!underline) {
            setUnderline(true);
            socket.emit('underline', true);
        }
        else {
            setUnderline(false);
            socket.emit('underline', false);
        }
    }

    return (
        <div className="App">
            <h1>Real-time Collaborative Editor</h1>
            <div className='controls'>
                <button onClick={() => Bold()}>
                    BOLD TEXT 
                </button>
                <button onClick={() => Italic()}>
                    ITALIC TEXT
                </button>
                <button onClick={() => Underline()}>
                    UNDERLINE TEXT    
                </button>
            </div>
            <textarea
                value={content}
                onChange={Edit}
                rows={30}
                cols={60}
                style={{
                    fontWeight: bold ? 'bold' : 'normal',
                    fontStyle: italic ? 'italic' : 'normal',
                    textDecoration: underline ? 'underline' : 'none'
                }}
            />
        </div>
    );
}

export default App;