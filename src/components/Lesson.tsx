import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format} from 'date-fns'
import ptBR  from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames'

interface LessonProps{
  title : string;
  slug : string;
  availableAt : Date;
  type : string
}


export function Lesson(props: LessonProps){

  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt)
  const availableDataFormat = format(props.availableAt, "EEEE' • 'd ' de 'MMMM ' • 'k'h'mm", {
    locale: ptBR
  })

  const isActiveLesson = slug === props.slug 

  return (
    <Link to={`/event/lesson/${props.slug}`} className='group'>
        <span className="text-gray-300">
          {availableDataFormat}
        </span>
        <div className={classNames('rounded border  p-4 mt-2 group-hover:border-green-500', {
          'bg-green-500' : isActiveLesson,
          'border-green-500' : isActiveLesson,
          'border-gray-500' : !isActiveLesson
        }

        )}>
          <header className="flex items-center justify-between">
           {isLessonAvailable ? ( 
            <span className={classNames('text-sm  font-medium flex items-center gap-2', {
              'text-white' : isActiveLesson,
              'text-blue-500' : !isActiveLesson
            })}>
              <CheckCircle size={20}/>
              Conteúdo Liberado
            </span> 
            ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20}/>
              Em Breve
            </span>
            ) }
            <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border font-bold', {
              'border-green-300 ' : !isActiveLesson,
              'border-white' : isActiveLesson
            })}>
             { props.type === 'Live' ? "AO VIVO" : "AULA PRÁTICA" }
            </span>
          </header>
          <strong className={classNames('mt-5 block', {
            'text-white' : isActiveLesson,
            'text-gray-200' : !isActiveLesson
          })}>
            {props.title}
          </strong>
        </div>
    </Link>
  )
}