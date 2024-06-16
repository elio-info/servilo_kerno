import { Test, TestingModule } from '@nestjs/testing';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service } from './n_catgcont-m_espc.service';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad } from '../schemas/n_catgcont-m_espc.schema';
import mongoose, { Model } from 'mongoose';
import { create } from 'domain';
import { getModelToken } from '@nestjs/mongoose';
import { Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/create-n_catgcont-m_espc.dto';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller } from './n_catgcont-m_espc.controller';


describe('Nomencla_Categorias_ContratacionManifestacion_Service_Test', () => {
  let n_ccM_esp_service: Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service;
  let n_ccM_esp_model:Model <Nomencla_Categorias_ContratacionManifestacion_Especialidad>

  const mock_n_ccm_espc_service={
    create: jest.fn()
    ,findAll: jest.fn(),
    findId: jest.fn(),
    findFirstName: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {//
    const module_ccm_esp: TestingModule = await Test.createTestingModule({
      // mio 
      // controllers:[Nomencla_Categorias_ContratacionManifestacion_Controller],
      //imports: [ /*" the Module containing "*/ Nomencla_Categorias_ContratacionManifestacion ],
      // fin mio
      providers: [
        Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service  //original
        , {
          provide:getModelToken(Nomencla_Categorias_ContratacionManifestacion_Especialidad.name),
          useValue: mock_n_ccm_espc_service,
        }
      ],
      
    }).compile();

    n_ccM_esp_service = module_ccm_esp.get<Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service>(Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service);
    n_ccM_esp_model= module_ccm_esp.get<Model<Nomencla_Categorias_ContratacionManifestacion_Especialidad>>(getModelToken(Nomencla_Categorias_ContratacionManifestacion_Especialidad.name))
  });


  it('should be defined', () => {
    expect(n_ccM_esp_service).toBeDefined();
  });

  //begin de test
  //#region create
  describe(
    'create',() =>{ //nombre del test a probar
      it('crea y evuelve nomen clasif contMansArts', async()=> { 
        //comence a probar
        //creando nomen clasif contMansArts
        const nomen_clasif_contrMansArts_Esp ={
          nombre_categoria_manifestacion_especialidad:'nueva clasif espc',
          ID_categoria_manifestacion: '666a2f452e6bbcc4b00916f4',
          isDeleted:false,
          createdAt: new Date()
          //,updatedAt:new Date()
        }//cierro objeto

        jest //
          .spyOn(n_ccM_esp_model,'create')
          .mockImplementationOnce(() => Promise.resolve(mock_n_ccm_espc_service.create()))
          // fin Jest
        const result= await n_ccM_esp_service.create(nomen_clasif_contrMansArts_Esp as Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto)

        expect (result).toEqual(mock_n_ccm_espc_service)

      })
    }
  )
  
  //#endregion create
  // end test
});
