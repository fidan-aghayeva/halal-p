import Image from 'next/image';
import { SERVICE_URL } from 'utils/constants';

import styles from './EmployeeCard.module.scss';

const EmployeeCard = props => {
    const { employee } = props;

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image src={SERVICE_URL + employee.image} alt={employee.name + employee.surname} fill />
            </div>
            <div className={styles.name}>
                {employee.name} {employee.surname}
            </div>
            <div className={styles.position}>{employee.position}</div>
        </div>
    );
};

export default EmployeeCard;
