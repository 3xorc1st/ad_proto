import { useState } from 'react';

const ConfigManager = () => {
  const [config, setConfig] = useState({
    facebook: { access_token: process.env.FACEBOOK_ACCESS_TOKEN || '' },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ facebook: { access_token: e.target.value } });
  };

  const handleSave = () => {
    alert('Config changes are not saved dynamically in this environment.');
  };

  return (
    <div>
      <h1>Config Manager</h1>
      <form>
        <label>
          Facebook Access Token:
          <input
            type="text"
            name="facebook_access_token"
            value={config.facebook.access_token}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default ConfigManager;
