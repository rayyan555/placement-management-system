package com.placementmanagement.util;

import com.placementmanagement.entity.StudentProfile;
import org.springframework.data.jpa.domain.Specification;

public class StudentSpecification {

    public static Specification<StudentProfile> hasDepartment(String department) {
        return (root, query, cb) ->
                department == null ? null :
                        cb.equal(root.get("department").get("name"), department);
    }

    public static Specification<StudentProfile> hasCgpa(Double cgpa) {
        return (root, query, cb) ->
                cgpa == null ? null :
                        cb.greaterThanOrEqualTo(root.get("cgpa"), cgpa);
    }

    public static Specification<StudentProfile> hasTenth(Double tenth) {
        return (root, query, cb) ->
                tenth == null ? null :
                        cb.greaterThanOrEqualTo(root.get("tenthPercentage"), tenth);
    }

    public static Specification<StudentProfile> hasTwelfth(Double twelfth) {
        return (root, query, cb) ->
                twelfth == null ? null :
                        cb.greaterThanOrEqualTo(root.get("twelfthPercentage"), twelfth);
    }

    public static Specification<StudentProfile> hasBacklogs(Integer backlogs) {
        return (root, query, cb) ->
                backlogs == null ? null :
                        cb.lessThanOrEqualTo(root.get("backlogs"), backlogs);
    }
}