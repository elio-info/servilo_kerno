import { Test, TestingModule } from '@nestjs/testing';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller as Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller } from './n_catgcont-m_espc.controller';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service } from './n_catgcont-m_espc.service';

describe('Nomencla_Categorias_ContratacionManifestacion_Espec_Controller', () => {
  let controller: Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller],
      providers: [Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service],
    }).compile();

    controller = module.get<Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller>(Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
