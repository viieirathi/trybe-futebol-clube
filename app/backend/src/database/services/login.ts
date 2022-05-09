import * as bcryptjs from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import Users from '../models/users';
import TokenValidate from '../utils/jwt';

const loginExist = async ({ email, password }: ILogin) => {
  const user = await Users.findOne({ where: { email } });

  if (!user) return { code: 401, data: { message: 'Incorrect email or password' } };

  const passCript = await bcryptjs.compare(password, user.password);

  if (!passCript) return { code: 401, data: { message: 'Incorrect email or password' } };

  const token = TokenValidate.tokenAssign({ email, password, role: user.role });

  const { id, username, role } = user;

  return { code: 200,
    data: { user: { id, username, role, email: user.email }, token } };
};

export default loginExist;
