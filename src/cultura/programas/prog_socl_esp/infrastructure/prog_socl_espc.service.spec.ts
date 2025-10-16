import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaSocial_Especial_Service } from './prog_socl_espc.service';
import { ProgramaSocial_Especial } from '../schemas/prog_socl_espc.schema';
import mongoose, { Model } from 'mongoose';
import { create } from 'domain';
import { getModelToken } from '@nestjs/mongoose';
import { Create_ProgramaSocial_Especial_Dto } from '../dto/create-prog_socl_espc.dto';


describe('ProgramaSocial_Service_Test', () => {
  let ps_esp_service: ProgramaSocial_Especial_Service;
  let ps_esp_model:Model <ProgramaSocial_Especial>

  const mock_ps_espc_service={
    create: jest.fn()
    ,findAll: jest.fn(),
    findId: jest.fn(),
    findFirstName: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {//
    const module_ps_esp: TestingModule = await Test.createTestingModule({
      // mio 
      // controllers:[ProgramaSocial_Controller],
      //imports: [ /*" the Module containing "*/ ProgramaSocial ],
      // fin mio
      providers: [
        ProgramaSocial_Especial_Service  //original
        , {
          provide:getModelToken(ProgramaSocial_Especial.name),
          useValue: mock_ps_espc_service,
        }
      ],
      
    }).compile();

    ps_esp_service = module_ps_esp.get<ProgramaSocial_Especial_Service>(ProgramaSocial_Especial_Service);
    ps_esp_model= module_ps_esp.get<Model<ProgramaSocial_Especial>>(getModelToken(ProgramaSocial_Especial.name))
  });


  it('should be defined', () => {
    expect(ps_esp_service).toBeDefined();
  });

  //begin de test
  //#region create
  describe(
    'create',() =>{ //nombre del test a probar
      it('crea y evuelve ps esp', async()=> { 
        //comence a probar
        //creando nomen clasif contMansArts
        const ps_Esp ={
          nombre_programasocial_especial:'nueva clasif espc',
          prog_socl: '666a2f452e6bbcc4b00916f4',
          isDeleted:false,
          createdAt: new Date()
          //,updatedAt:new Date()
        }//cierro objeto

        jest //
          .spyOn(ps_esp_model,'create')
          .mockImplementationOnce(() => Promise.resolve(mock_ps_espc_service.create()))
          // fin Jest
        const result= await ps_esp_service.create(ps_Esp as Create_ProgramaSocial_Especial_Dto)

        expect (result).toEqual(mock_ps_espc_service)

      })
    }
  )
  
  //#endregion create
  // end test
});
