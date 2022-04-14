import { IsBoolean, IsString } from 'class-validator';

class CreatePokemon {
  @IsString()
  public name: number;

  @IsString()
  public type: string;

  @IsBoolean()
  public isFeatured: boolean;

  @IsString()
  public imageUrl: string;
}

export default CreatePokemon;
