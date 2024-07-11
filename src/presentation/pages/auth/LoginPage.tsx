/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useNavigate } from 'react-router-dom';
import { Api } from '../../../config/api/api';
import { CustomModals } from '../../../config/helpers/modals/custom_modals';
import { PrimaryButton } from '../../components/shared/button/PrimaryButton';
import { CustomTextfieldComponent } from '../../components/shared/input/CustomTextfieldComponent';
import { useForm } from '../../hooks/form/useForm';
import { useState } from 'react';
import { Status } from '../../../datasource/entities/status';
import { useAppDispatch } from '../../store/hooks';
import { login as loginStore } from '../../store/slices/auth/auth';
import { LoginAuthResponse } from '../../../datasource/entities/responses/loginauth_response';

const LoginPage = () => {
  const [status, setstatus] = useState<Status>(Status.notStarted);
  const [hasInputError, setHasInputError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, resetForm, handleChange } = useForm({
    email: '',
    password: '',
  });

  const login = async () => {
    if (values.email.length === 0 || values.password.length === 0)
      return setHasInputError(true);
    try {
      setstatus(Status.inProgress);
      const resp = await Api.instance.post<LoginAuthResponse>('/api/auth', {
        email: values.email.trim(),
        password: values.password,
      });
      const data = resp.data;
      dispatch(loginStore(data));
      resetForm();
      navigate('/home', { replace: true });
      setstatus(Status.done);
    } catch (error: any) {
      console.log(error);
      setstatus(Status.notStarted);
      CustomModals.showCustomModal(
        'Credenciales Incorrectas',
        'error',
        error.response.data.msg
      );
    }
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    await login();
  };
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  if (token && id) return <Navigate to={'/auth/loading'} replace />;
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">
            Inicio de Sesion
          </h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={onSubmit}>
              <div className="px-5 py-7">
                <CustomTextfieldComponent
                  error={values.email.length <= 0 && hasInputError}
                  errorMsg="El email es obligatorio"
                  title="Email"
                  typeInput="email"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                />
                <CustomTextfieldComponent
                  error={values.password.length <= 0 && hasInputError}
                  errorMsg="La Contraseña es obligatoria "
                  typeInput="password"
                  title="Contraseña"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <PrimaryButton
                  disabled={status === Status.inProgress}
                  title="Iniciar Sesion"
                  onClick={() => onSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
