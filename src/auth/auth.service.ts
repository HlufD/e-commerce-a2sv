import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginDto, SignupDto } from "./dto/auth-request.dto";
import {
  IUserRepositoryToken,
  type IUserRepository,
} from "./domain/interfaces/user.repository";
import {
  IHashingServiceToken,
  type IHashingService,
} from "src/shared/interfaces/IHashingService";
import {
  type IJwtService,
  IJwtServiceToken,
} from "src/shared/interfaces/IJwtService";

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(IHashingServiceToken)
    private readonly hashingService: IHashingService,

    @Inject(IJwtServiceToken) private readonly jwtService: IJwtService
  ) {}

  async singUp(payload: SignupDto) {
    const { email, username, password } = payload;
    let user = await this.userRepository.findByEmail(email);

    if (user) throw new ConflictException("User already exists");

    if (username) {
      user = await this.userRepository.findByUsername(username);

      if (user) throw new ConflictException("Username already exists");
    }

    const passwordHash = await this.hashingService.hash(password);

    const data = await this.userRepository.create(
      email,
      passwordHash,
      username
    );
    return {
      status: 201,
      message: "Registered Successfully",
      data,
    };
  }

  async login(payload: LoginDto) {
    const { email, password } = payload;
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFoundException("User not found");

    const passwordMatch = await this.hashingService.compare(
      password,
      user.password!
    );

    if (!passwordMatch) throw new UnauthorizedException("invalid credentials");

    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const jwtToke = await this.jwtService.sign(data, {
      secret: process.env.JWT_SECRET,
      expiresIn: Number(process.env.JWT_TTL) || "1d",
    });

    return {
      status: 200,
      message: "Login Successfully",
      data: {
        ...data,
        token: jwtToke,
      },
    };
  }
}
