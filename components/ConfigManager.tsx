import { useState } from 'react';
import { readConfig, writeConfig } from '@/lib/configManager';

const ConfigManager = () => {
    const [config, setConfig] = useState(readConfig());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        writeConfig(config);
        alert('Config saved successfully!');
    };

    return (
        <div>
            <h1>Config Manager</h1>
            <form>
                <label>
                    Facebook Access Token:
                    <input type="text" name="facebook.access_token" value={config.facebook.access_token} onChange={handleChange} />
                </label>
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default ConfigManager;