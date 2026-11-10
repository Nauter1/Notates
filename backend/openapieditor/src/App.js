import { useState, useEffect } from 'react';
import { OpenAPIEditor } from '@apitomy/openapi-editor';

function App() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetch('/api/openapi.json')
            .then(res => res.text())
            .then(data => setContent(data));
    }, []);
    const handleChange = (event) => {
      console.log(event.getContent());
    }

    if (!content) return <div>Loading...</div>;

    return (
        <OpenAPIEditor
            initialContent={content}
            onChange={setContent}
        />
    );
}
export default App