import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaSocial_Service } from './prog_socl.service';
import { ProgramaSocial } from '../schemas/prog_socl.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Create_ProgramaSocial_Dto } from '../dto/create-prog_socl.dto';


describe('ProgramaSocial_Service_Test', () => {
  let n_c_psc_s: ProgramaSocial_Service;
  let n_c_psc_m:Model <ProgramaSocial>

  const mock_n_c_psc_service={
    create: jest.fn()
    ,findAll: jest.fn(),
    findId: jest.fn(),
    findFirstName: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {//
    const module: TestingModule = await Test.createTestingModule({
      // mio 
      // controllers:[ProgramaSocial_Controller],
      //imports: [ /*" the Module containing "*/ ProgramaSocial ],
      // fin mio
      providers: [
        ProgramaSocial_Service  //original
        , {
          provide:getModelToken(ProgramaSocial.name),
          useValue: mock_n_c_psc_service,
        }
      ],
      
    }).compile();

    n_c_psc_s = module.get<ProgramaSocial_Service>(ProgramaSocial_Service);
    n_c_psc_m= module.get<Model<ProgramaSocial>>(getModelToken(ProgramaSocial.name))
  });


  it('should be defined', () => {
    expect(n_c_psc_s).toBeDefined();
  });

  //begin de test
  //#region create
  describe(
    'create',() =>{ //nombre del test a probar
      it('crea y evuelve nomen clasif contMansArts', async()=> { 
        //comence a probar
        //creando nomen clasif contMansArts
        const nomen_clasif_contrMansArts ={
          nombre_programasocial:'nueva clasif',
          priorizado: false,
          createdAt: new Date()
          //,updatedAt:new Date()
        }//cierro objeto

        jest //
          .spyOn(n_c_psc_s,'create')
          .mockImplementationOnce(() => Promise.resolve(mock_n_c_psc_service.create()))
          // fin Jest
        const result= await n_c_psc_s.create(nomen_clasif_contrMansArts as Create_ProgramaSocial_Dto,)

        expect (result).toEqual(mock_n_c_psc_service)

      })
    }
  )
  //#endregion create
  // end test
});
