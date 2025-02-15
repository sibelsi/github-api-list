import {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@shared/lib/redux/store.ts";
import {githubApi} from "@shared/api";
import {authActions} from "@features/auth/model/slice.ts";
import styles from './credentials-page.module.scss';
import {Input} from "@shared/ui";
import {Button} from "@shared/ui/button/button.tsx";

export const CredentialsPage = () => {
  const [owner, setOwner] = useState('');
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSubmit =useCallback( async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    githubApi.checkCredential({token})
      .then(()=>{
        dispatch(authActions.setCredentials({ owner, token }));
        navigate('/repos')
      })
      .catch((error) => {
        console.log(error);
        dispatch(authActions.setError('Invalid credentials. Please check your token.'))
      })
      .finally(()=>{setIsSubmitting(false)})

  },[owner, token]
)
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>GitHub Credentials Setup</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="IRepository Owner"
          type="text"
          value={owner}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOwner(e.target.value)}
          required
        />

        <Input
          label="Personal Access Token"
          type="password"
          value={token}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
          required
        />

        {error && <div className={styles.error}>{error}</div>}

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Verifying...' : 'Connect'}
        </Button>
      </form>
    </div>
  );
};